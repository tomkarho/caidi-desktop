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
          rm -rf dist
          rm -rf build
          docker run --rm -v \"${CURRENT_PATH}:/app\" ${APP_NAME}:latest
        """
    }

    stage('Package Windows') {
        sh """
          rm -rf windows
          mkdir windows

          cp -r dist/win-unpacked windows/
          cp dist/*.exe windows/

          ls -lah windows/
        """
    }
    stage('Package Linux') {
        sh """
          rm -rf linux
          mkdir linux

          cp -r dist/linux-unpacked linux/
          cp dist/*.AppImage linux/
          cp dist/*.snap linux/

          ls -lah linux/
        """
    }
}