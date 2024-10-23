import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Employee } from '../../model/employee';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

interface MockData {
  salary: string;
  skills: string[];
}

@Component({
  selector: 'app-employee-details-page',
  standalone: true,
  imports: [TagModule, ButtonModule, RouterModule, ProgressBarModule],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.scss',
})
export class EmployeeDetailsPageComponent {
  public employeeService: EmployeeService = inject(EmployeeService);
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public employeeData?: Employee;
  public employeeDataMocked?: MockData;

  private skills: string[] = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'SQL',
    'NoSQL',
    'HTML',
    'CSS',
    'Angular',
    'React',
    'Vue.js',
    'Node.js',
    'Express',
    'Django',
    'Flask',
    'Spring Boot',
    'Kotlin',
    'Swift',
    'Ruby on Rails',
    'GraphQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'GCP',
    'Git',
    'CI/CD',
    'TDD',
    'SOLID',
    'Microservices',
    'REST APIs',
    'GraphQL APIs',
    'Agile methodologies',
    'DevOps',
    'Jenkins',
    'Machine Learning',
    'Deep Learning',
    'Data Science',
    'Big Data',
    'Blockchain',
    'Cybersecurity',
    'Team Management',
    'Mentoring',
    'Conflict Resolution',
    'Decision Making',
    'Strategic Planning',
    'Communication Skills',
    'Emotional Intelligence',
    'Problem Solving',
    'Delegation',
    'Goal Setting',
    'Performance Management',
    'Time Management',
    'Stakeholder Management',
    'Risk Management',
    'Change Management',
    'Cross-functional Collaboration',
    'Vision and Direction',
    'Negotiation',
    'Motivation',
    'Coaching',
    'Agile Leadership',
    'Project Management',
    'Cultural Awareness',
    'Leadership under Pressure',
    'Active Listening',
    'Influencing',
  ];

  ngOnInit(): void {
    this.initializeMockData();
    this.getEmployeeData();
  }

  private initializeMockData(): void {
    this.employeeDataMocked = {
      salary: '150.000',
      skills: this.getRandomSkills(),
    } as MockData;
  }

  private getEmployeeData(): void {
    this.employeeService
      .getEmployee(this.activatedRoute.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (data: Employee) => {
          this.employeeData = data;
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  private getRandomSkills(): string[] {
    const numOfSkills = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    const shuffledSkills = this.skills.sort(() => Math.random() - 0.5);
    return shuffledSkills.slice(0, numOfSkills);
  }

  public getWellnessScoreColor(): string {
    const value = this.employeeData?.wellnessScore ?? 0;
    if (value <= 40) {
      return 'lightcoral';
    } else if (value > 40 && value <= 70) {
      return 'lightsalmon';
    } else {
      return 'lightgreen';
    }
  }
  public getProductivityScoreColor(): string {
    const value = this.employeeData?.wellnessScore ?? 0;
    if (value <= 40) {
      return 'lightcoral';
    } else if (value > 40 && value <= 70) {
      return 'lightsalmon';
    } else {
      return 'lightgreen';
    }
  }
}
