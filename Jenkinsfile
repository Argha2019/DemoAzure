@Library('github.com/releaseworks/jenkinslib') _
pipeline{
    agent any

    tools{nodejs "node"}

    stages{
        stage("Preparation"){
            steps{
                sh script: "npm install && npm install --save-dev @babel/core @babel/preset-env @babel/preset-flow @babel/preset-react babel-plugin-typescript-to-proptypes enzyme enzyme-adapter-react-16 enzyme-to-json html-webpack-plugin jest react-test-renderer webpack webpack-cli webpack-dev-server"

            }
            post{
                success{
                    echo "====++++Preparation executed succesfully++++===="
                }
                failure{
                    echo "====++++Preparation execution failed++++===="
                }
            }
        }
        stage("Test"){
            steps{
                echo "========executing Test========"

                sh label: 'Test', script: "npm test -- -u"
            }
            post {
                success{
                    echo "====++++Test executed successfully++++===="

                }
                failure{
                    echo "====++++Test exceution failed++++===="
                }
            }
        }
        stage("Build Frontend for Production"){
            steps{
                echo "====++++executing Build Frontend for Production++++===="
                sh script: "npm run build"
            }
            post{
                success{
                    echo "====++++Build Frontend for Production executed succesfully++++===="
                }
                failure{
                    echo "====++++Build Frontend for Production execution failed++++===="
                }

            }
        }
        stage('Sonarqube') {
            environment {
                scannerHome = tool 'Sonar Scanner 4'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
      stage('Deploy to s3 bucket') {
      steps{
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'aws-key', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
        AWS("--region=us-east-2 s3 ls")
        AWS("s3 sync dist/ s3://psi-oms-frontend --acl public-read")
    }
    }
  }
    }
    post{
        always{
          archiveArtifacts artifacts: '**/*.js', fingerprint:true
          archiveArtifacts artifacts: '**/*.jsx', fingerprint:true
          archiveArtifacts artifacts: '**/*.html', fingerprint:true
        }
        success{
            echo "========pipeline executed successfully========"
        }
        failure {
            emailext body: 'Build for concerned repository has failed', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Jenkins Build Failed'


            script
                 {
                    issue = [fields: [ project: [key: 'PSIGGN'],
                       summary: 'Jenkins Build Failed',
                       description: 'Failure: '+'http://18.218.158.65:8080/job/'+ env.JOB_BASE_NAME +'/'+ env.BUILD_NUMBER +'/consoleText',
                       issuetype: [name: 'Issue']
                    ]]
                    newIssue = jiraNewIssue issue: issue, site: 'Jira_sapient'
                }

        }
    }
}