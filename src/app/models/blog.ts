import { comment } from "./comment"

export class Blog {
    id:number=0
    name?:string
    author?:string
    image?:string|ArrayBuffer
    authorUname?:string
    date:Date=new Date()
    comments:comment[]=[]
    content:string=""
}

