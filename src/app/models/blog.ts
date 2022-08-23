import { comment } from "./comment"

export class Blog {
    id?:number
    name?:string
    author?:string
    image?:string
    authorUname?:string
    date:Date|any
    comments:comment[]=[]
    content?:string
}
