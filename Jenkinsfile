node {
    stage('Init') {
        checkout scm

        sh"""
          rm -rf build
          rm -rf dist
          npm install
        """
    },
    stage('Build') {
      sh"""
        npm run build
      """
    }
    stage('Package') {
      sh"""
        npm run package
        ls -lah build
        ls -lah dist
      """
    }
}