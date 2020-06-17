const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []

function menu () {
    function createManager () {
        console.log("Build your team here!");
        inquirer.prompt([
            {
                type: "input" ,
                name: "managerName",
                message: "What is your manager's name?"
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your manager ID?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?"
            }
        ]).then(response =>{
            const manager = new Manager (response.managerName,response.managerID,response.managerEmail,response.managerOfficeNumber)
            teamMembers.push (manager)
            createTeam ()
        })
    }
    function createTeam () {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer","Intern","i don't want to add anymore team members"]
            }
        ]).then(response => {
            switch(response.memberChoice) {
                case "Engineer": 
                addEngineer()
                break;
                case "Intern":
                addIntern()
                break;
                default: 
                buildTeam()
            }
        })
    }
    function addEngineer () {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?"
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is your engineer's ID?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub?"
            }
        ]).then(response => {
            const engineer = new Engineer (response.engineerName,response.engineerID,response.engineerEmail,response.engineerGithub)
            teamMembers.push (engineer)
            createTeam()
        })
    }
    
        function addIntern () {
            inquirer.prompt([
                {
                    type: "input",
                    name: "internName",
                    message: "What is your intern's name?"
                },
                {
                    type: "input",
                    name: "internID",
                    message: "What is your intern's ID?"
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is your intern's email?"
                },
                {
                    type: "input",
                    name: "internSchool",
                    message: "What is your intern's school?"
                }
            ]).then(response => {
                const intern = new Intern (response.internName,response.internID,response.internEmail,response.internSchool)
                teamMembers.push (intern)
                createTeam()
            })
        }
    function buildTeam () {
        if (!fs.existsSync (OUTPUT_DIR)){
            fs.mkdirSync (OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    }
    createManager()
}






menu ()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
