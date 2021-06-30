import { Toolbar } from 'ngx-editor';

export class Project{
    pid!: string
    title!: string
    desc!: string
    shortDesc!: string
    author!: string
    createdAt!: string
    authorName!: string
    authorGender!: string
    tags: string[]=[]
}

export class Profile{
    uid!: string
    name!: string
    mis!: string
    branch!: string
    yearOfStudy!: string
    email!: string
    gender!: string
    profilePic!: string
    createdAt!: string
    projects!: string[]
    skills!: string[]
    interests!: string[]
}

export const TAGS=[
    'Web app', 'Android app', 'Desktop app', 'Frontend', 'Backend', 'UI/UX', 'Cloud',
    'Software', 'Core Electrical', 'Power Systems', 'Embeded Systems', 'Control Systems', 'Electrical Machines',
    'Machine Learning', 'Artificial Intelligence', 'Data Science', 'Data Visualization', 'Computer Vision', 'NLP',
    'Analog Circuit Design', 'Digital Circuit Design', 'Communication', 'Automotive', 'VLSI', 'Firmware'
]

export const MAIN_TITLE='IdeaShare'

export const TOOLBAR: Toolbar=[
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['link', 'text_color', 'code']
]