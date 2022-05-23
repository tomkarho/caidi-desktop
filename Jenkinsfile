node {
    def dockerImageId
    def APP_NAME="caidi-app"
    def UID=sh(script: "id -u", returnStdout: true).trim()
    def GID=sh(script: "id -g", returnStdout: true).trim()
    def CURRENT_PATH=sh(script: "pwd", returnStdout: true).trim()

    stage('Init') {
        checkout scm
    }

    stage('Docker build') {
        dockerImageId = sh(
          script: """docker build -q -f Dockerfile.build --build-arg UID=${UID} --build-arg GID=${GID} -t ${APP_NAME} .""",
          returnStdout: true
        ).trim()
    }

    stage('App build') {
        sh """
          rm -rf dist
          rm -rf build
          docker run --rm -v \"${CURRENT_PATH}:/app\" ${APP_NAME}:latest
        """
    }

    def versionHash=sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    def versionNumber=sh(script: "git --no-pager log --oneline | wc -l", returnStdout: true).trim()
    def linuxPackage="caidi-linux-${versionHash}-${versionNumber}.tgza"
    def windowsPackage="caidi-windows-${versionHash}-${versionNumber}.7za"
    def linuxPackageExists = fileExists "$linuxPackage"
    def windowsPackageExists = fileExists "$windowsPackage"

    if (!linuxPackageExists) {
        echo "LINUX PACKAGE MISSING"
    }

    if (!windowsPackageExists) {
        echo "WINDOWS PACKAGE MISSING"
    }

    stage('Verify') {

        sh """
            ls -lah ${linuxPackage}
            ls -lah ${windowsPackage}
        """
    }
    stage('Publish') {
      sh """
        mv ${linuxPackage} /var/www/html/artifacts/
        mv ${windowsPackage} /var/www/html/artifacts/
      """
    }
    stage('Clean') {
        sh "docker rmi -f ${dockerImageId}"
    }
}