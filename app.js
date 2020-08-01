const {writeFile, copyFile} = require("./utils/generate-site.js")
const generatePage = require('./src/page-template.js');
//const profileDataArgs = process.argv.slice(2);
//const [name, github] = profileDataArgs;



//fs.writeFile('index.html', generatePage(name,github), err => {
   // if (err) throw err;
    //console.log('Portfolio complete! Check out index.html to see the output!');
//})

const inquirer = require ('inquirer')

const promptUser = () => {
    
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is your name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter your name!")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username (Required)',
        validate: userNameInput => {
            if (userNameInput) {
                return true;
            } else {
                console.log("Please enter your Github UserName!")
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: "input",
        name: "about",
        message: "Provide some information about yourself:",
        when: ({confirmAbout}) => confirmAbout
    }
])
};
const promptProject = (portfolioData) => {
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    };
    console.log(`
    =================
    Add a New Project
    =================`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log("Please enter the name of your project!")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project (Required)",
            validate: projectDesc => {
                if (projectDesc) {
                    return true;
                } else {
                    console.log("Please enter a description of your project")
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you create this project with? (Check all that apply)",
            choices: ['Javascipt', "HTML", "CSS", "ES6", "jquery", "bootstrap", "node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the Github link to your project. (Required)",
            validate: gitLink => {
                if (gitLink) {
                    return true;
                } else {
                    console.log("Please enter the link for your project")
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            deafult: false

        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
        
    });
};


  
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
