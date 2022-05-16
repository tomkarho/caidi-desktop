node {
    def APP_NAME="caidi-app"
    def UID=sh(script: "id -u", returnStdout: true).trim()
    def GID=sh(script: "id -g", returnStdout: true).trim()
    def CURRENT_PATH=sh(script: "pwd", returnStdout: true).trim()

    stage('Init') {
        checkout scm
    }

    def version=sh(script: "git --no-pager log --oneline | wc -l", returnStdout: true).trim()
    stage('Docker build') {
        sh """
          docker build -f Dockerfile.build --build-arg UID=${UID} --build-arg GID=${GID} -t ${APP_NAME} .
        """
    }

    stage('App build') {
        sh """
          docker run --rm -v \"${CURRENT_PATH}:/app\" ${APP_NAME}:latest
        """
    }

    stage('Verify') {
        sh """
          ls -lah
        """
    }
}