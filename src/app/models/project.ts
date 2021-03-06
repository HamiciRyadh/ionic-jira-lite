export class Project {
  id: string;
  name: string;
  description: string;
  admin: string;
  canRead: string[];
  canWrite: string[];


  constructor(name: string, description: string, uid: string) {
    this.id = '';
    this.name = name;
    this.description = description;
    this.admin = uid;
    this.canRead = [];
    this.canRead.push(uid);
    this.canWrite = [];
    this.canWrite.push(uid);
  }
}
