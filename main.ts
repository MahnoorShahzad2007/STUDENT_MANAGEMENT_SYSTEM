#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

// Define a Student interface
interface Student {
  name: string;
  age: number;
  grade: string;
}

// In-memory storage for students
const students: Student[] = [];

// Function to add a student
async function addStudent(): Promise<void> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter student name:',
    },
    {
      type: 'number',
      name: 'age',
      message: 'Enter student age:',
    },
    {
      type: 'input',
      name: 'grade',
      message: 'Enter student grade:',
    },
  ]);

  students.push(answers as Student);
  console.log(chalk.green('Student added successfully!'));
}

// Function to list all students
function listStudents(): void {
  if (students.length === 0) {
    console.log(chalk.yellow('No students found.'));
  } else {
    console.log(chalk.cyan('Student List:'));
    students.forEach((student, index) => {
      console.log(chalk.blue(`Student ${index + 1}:`));
      console.log(chalk.blue(`  Name: ${student.name}`));
      console.log(chalk.blue(`  Age: ${student.age}`));
      console.log(chalk.blue(`  Grade: ${student.grade}`));
    });
  }
}

// Function to find a student by name
async function findStudent(): Promise<void> {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the student to find:',
    },
  ]);

  const student = students.find(s => s.name.toLowerCase() === name.toLowerCase());
  if (student) {
    console.log(chalk.cyan('Student Found:'));
    console.log(chalk.green(`Name: ${student.name}`));
    console.log(chalk.green(`Age: ${student.age}`));
    console.log(chalk.green(`Grade: ${student.grade}`));
  } else {
    console.log(chalk.red('Student not found.'));
  }
}

// Main function to show the menu and handle user choices
async function main(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Add Student', 'List Students', 'Find Student', 'Exit'],
      },
    ]);

    switch (action) {
      case 'Add Student':
        await addStudent();
        break;
      case 'List Students':
        listStudents();
        break;
      case 'Find Student':
        await findStudent();
        break;
      case 'Exit':
        console.log(chalk.green('Goodbye!'));
        return;
    }
  }
}

// Start the application
main().catch(error => console.error(chalk.red('An error occurred:'), error));
