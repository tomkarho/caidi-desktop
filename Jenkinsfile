node {
    def dockerImageId
    def APP_NAME="caidi-app"
    def UID=sh(script: "id -u", returnStdout: true).trim()
    def GID=sh(script: "id -g", returnStdout: true).trim()
    def CURRENT_PATH=sh(script: "pwd", returnStdout: true).trim()

    stage('Init') {
        checkout scm
    }

    def version=sh(script: "git --no-pager log --oneline | wc -l", returnStdout: true).trim()
    stage('Docker build') {
        dockerImageId = sh("""
          docker build -f Dockerfile.build --build-arg UID=${UID} --build-arg GID=${GID} -t ${APP_NAME} .
        """, returnStdout: true)
    }

    stage('App build') {
        sh """
          rm -rf dist
          rm -rf build
          docker run --rm -v \"${CURRENT_PATH}:/app\" ${APP_NAME}:latest
        """
    }

    stage('Verify') {
        sh """
            ls -lah
        """
    }
    stage('Clean') {
        sh "docker rmi -f ${dockerImageId}"
    }
}