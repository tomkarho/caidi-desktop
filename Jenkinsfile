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
    def linuxPackage="caidi-linux-${versionHash}-${versionNumber}.tgz"
    def windowsPackage="caidi-windows-${versionHash}-${versionNumber}.7z"
    def linuxPackageExists = fileExists "$linuxPackage"
    def windowsPackageExists = fileExists "$windowsPackage"

    stage('Verify') {
      if (!linuxPackageExists) {
        error("Linux package is not generated")
      }

      if (!windowsPackageExists) {
        error("Windows package is generated")
      }

      sh """
        ls -lah ${linuxPackage}
        ls -lah ${windowsPackage}
      """
    }
    stage('Publish') {
      sh """
        mkdir /var/www/html/artifacts/caidi
        mv ${linuxPackage} /var/www/html/artifacts/caidi/
        mv ${windowsPackage} /var/www/html/artifacts/caidi/
      """
    }
    stage('Clean') {
      sh "docker rmi -f ${dockerImageId}"
    }
}