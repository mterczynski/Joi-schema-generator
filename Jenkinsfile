pipeline {
  agent any

  environment {
    DESTINATION = "root@mterczynski.pl:/var/www/html/joi-schema-generator"
  }

  stages {
    stage('Install') {
      steps {
        sh "npm install"
      }
    }

    stage('Test') {
      steps {
        sh "npm test"
      }
    }

    stage('Build') {
      steps {
        sh "npm run build"
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          scp -r build ${DESTINATION}
          exit
        '''
      }
    }
  }
}
