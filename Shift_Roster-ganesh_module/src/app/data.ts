export interface Employee {
    name:string,	
    team:string,	
    location: string,
    shift: string,
  }

  export class Ilogin{
    email!:string;
    password!:string;
    statusCd!: string;
     statusMsg! : string;
    authStatus!: string;
  }
  export interface CommonResponse {
    ErrorCode: number,
    message:String,
    data:Object      
}
  export class EmpData{
    'name':string;
    'team':string;	
    'location': string;
    'shift': string
  }
  export class ReqData{
    'resourceName':string;
    'type':string;	
    'startDate': Date;
    'endDate': Date;
    'currentShift': string;
    'reason':string;
    'action':any
  }
  export class SwapData{
    'resourceName':string;
    'actualShift':string;	
    'actualShiftDate': Date;
    'desiredShiftDate': Date;
    'desiredShift': string;
    'reason':string;
    'action':any
  }
  export class User{
    firstName!:string;
    lastName!:string;
    email!: string;
    location!:string;
    level!: string;
    password!: string;
    confirmPassword!:string
  }
  export const tableData =[{"resourceName":"Ms. Delia Heathcote","team":"ad","location":"rerum","1 Fri":'1',"2 Sat":"Holiday"},{"resourceName":"Andreane Stracke","team":"sunt","location":"sit","2 Sat":"PTO"},{"resourceName":"Tia Williamson DDS","team":"quisquam","location":"illo"},{"resourceName":"Mr. Archibald Gaylord I","team":"dolorum","location":"ex"},{"resourceName":"Wilhelmine Fritsch","team":"recusandae","location":"facilis"},{"resourceName":"Miss Delta Jaskolski I","team":"nam","location":"deserunt"},{"resourceName":"Mayra Torp","team":"dolorem","location":"voluptatem"},{"resourceName":"Percy Kemmer Sr.","team":"aperiam","location":"ut"},{"resourceName":"Vivien Leffler","team":"maxime","location":"maxime"},{"resourceName":"Dr. Larissa Hudson I","team":"deleniti","location":"fugiat"}];
  export const dummyData = [{"name":"Julie Reilly Jr.","team":"autem","shift":'1',"location":"repellendus"},{"name":"Marielle Bruen","team":"error","shift":'2',"location":"doloremque"},{"name":"Modesta Beer III","team":"veniam","shift":'3',"location":"hic"},{"name":"Dr. Sam Russel V","team":"porro","shift":'3',"location":"ea"},{"name":"Xander Ullrich Jr.","team":"cum","shift":'1',"location":"perspiciatis"},{"name":"Prof. Cordie Fahey","team":"error","shift":'2',"location":"odio"},
  {"name":"Willy Runolfsdottir","team":"odio","shift":'Holiday',"location":"amet"},{"name":"Kiana Leffler","team":"est","shift":'2',"location":"ut"},{"name":"Prof. Gretchen Keebler IV","team":"consectetur","shift":'1',"location":"ut"},{"name":"Mrs. Violet Satterfield Sr.","team":"atque","shift":'3',"location":"quibusdam"},{"name":"Wilford Hill","team":"sunt","shift":'2',"location":"delectus"},{"name":"Regan Koepp","team":"magnam","shift":'1',"location":"quod"},
  {"name":"Maximilian Miller","team":"dolore","shift":'3',"location":"enim"},
  {"name":"Mrs. Beatrice Cole Sr.","team":"iure","shift":'1',"location":"et"},
  {"name":"Mitchell Rosenbaum DVM","team":"corporis","shift":'2',"location":"qui"},
  {"name":"Hildegard Bogisich","team":"quidem","shift":'3',"location":"et"},
  {"name":"Arely Langworth","team":"voluptate","shift":'1',"location":"non"},{"name":"Prof. Eryn Huel","team":"totam","shift":'3',"location":"fugit"},{"name":"Giovani Bartoletti","team":"cupiditate","shift":'2',"location":"voluptate"},
  {"name":"Wiley Yost","team":"ut","shift":'2',"location":"dolore"},{"name":"Johanna Tillman MD","team":"quia","shift":'PTO',"location":"quam"},
  {"name":"Mrs. Christina Jaskolski PhD","team":"dignissimos","shift":'2',"location":"velit"},{"name":"Jocelyn Swaniawski","team":"non","shift":'3',"location":"quia"},{"name":"Prof. Lloyd Hoeger","team":"est","shift":'1',"location":"quibusdam"},{"name":"Jennings Lakin MD","team":"odio","shift":'2',"location":"sit"},
  {"name":"Shanna Keeling","team":"sed","shift":'2',"location":"quisquam"},{"name":"Kiley Kilback","team":"itaque","shift":'2',"location":"quam"},{"name":"Dr. Brett Reynolds","team":"nemo","shift":'2',"location":"consectetur"},{"name":"Jannie Jakubowski","team":"nostrum","shift":'1',"location":"facere"},{"name":"Enrico Leannon","team":"deleniti","shift":'PTO',"location":"sit"},
  {"name":"Cory Feest DVM","team":"et","shift":'6',"location":"aliquam"},{"name":"Jacky Heathcote","team":"dolores","shift":'Holiday',"location":"fugiat"},{"name":"Brook Zemlak","team":"molestiae","shift":'1',"location":"quia"},{"name":"Declan Bauch","team":"nobis","shift":'3',"location":"minus"},
  {"name":"Nathen Fadel","team":"assumenda","shift":'1',"location":"est"},{"name":"Jailyn Lubowitz","team":"saepe","shift":'3',"location":"ut"},{"name":"Millie Streich","team":"voluptatem","shift":'1',"location":"sequi"},
  {"name":"Eusebio Hackett","team":"quod","shift":'2',"location":"esse"},{"name":"Prof. Ciara Harris I","team":"nemo","shift":'PTO',"location":"repellendus"},{"name":"Rodolfo Harris","team":"quae","shift":'3',"location":"laborum"}
 ];
 export const RequestData =[{"resourceName":"Neddie Totman","type":"Neddie","startDate":"12/20/2021","endDate":"7/17/2022","currentShift":1,"reason":"in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus"},
  {"resourceName":"Celeste Tynan","type":"Celeste","startDate":"3/8/2022","endDate":"10/18/2021","currentShift":2,"reason":"sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit"},
  {"resourceName":"Lancelot Dreakin","type":"Lancelot","startDate":"2/21/2022","endDate":"6/26/2022","currentShift":3,"reason":"porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh"},
  {"resourceName":"Patricio Ibert","type":"Patricio","startDate":"6/30/2022","endDate":"10/15/2021","currentShift":4,"reason":"sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci"},
  {"resourceName":"Carin Rizzolo","type":"Carin","startDate":"1/30/2022","endDate":"9/7/2022","currentShift":5,"reason":"commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non"},
  {"resourceName":"Hilton Maro","type":"Hilton","startDate":"4/29/2022","endDate":"3/17/2022","currentShift":6,"reason":"vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla"},
  {"resourceName":"Devinne Jobbings","type":"Devinne","startDate":"9/26/2021","endDate":"2/19/2022","currentShift":7,"reason":"id nisl venenatis lacinia aenean sit amet justo morbi ut odio"},
  {"resourceName":"Georgeta Buncher","type":"Georgeta","startDate":"11/24/2021","endDate":"6/26/2022","currentShift":8,"reason":"velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla"},
  {"resourceName":"Karlene Straneo","type":"Karlene","startDate":"7/23/2022","endDate":"2/23/2022","currentShift":9,"reason":"ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean"},
  {"resourceName":"Sandi Rawsthorne","type":"Sandi","startDate":"9/21/2022","endDate":"1/22/2022","currentShift":10,"reason":"dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh"}
];

export const swapData = [{"resourceName":"Aurelie Willeson","actualShiftDate":"05/20/2022","actualShift":1,"desiredShiftDate":"11/04/2023","desiredShift":1,"reason":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."},
{"resourceName":"Ricky Scrange","actualShiftDate":"11/05/2022","actualShift":2,"desiredShiftDate":"01/07/2024","desiredShift":2,"reason":"In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."},
{"resourceName":"Rem Domek","actualShiftDate":"12/15/2021","actualShift":3,"desiredShiftDate":"05/25/2023","desiredShift":3,"reason":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl."},
{"resourceName":"Esteban Winckles","actualShiftDate":"12/02/2022","actualShift":4,"desiredShiftDate":"06/03/2023","desiredShift":4,"reason":"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."},
{"resourceName":"Rustin MacWilliam","actualShiftDate":"10/08/2021","actualShift":5,"desiredShiftDate":"01/03/2024","desiredShift":5,"reason":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."},
{"resourceName":"Letizia Beamont","actualShiftDate":"11/21/2022","actualShift":6,"desiredShiftDate":"12/20/2023","desiredShift":6,"reason":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."},
{"resourceName":"Edith MacHostie","actualShiftDate":"08/28/2022","actualShift":7,"desiredShiftDate":"11/18/2023","desiredShift":7,"reason":"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."},
{"resourceName":"Janie McCourtie","actualShiftDate":"06/17/2022","actualShift":8,"desiredShiftDate":"05/07/2023","desiredShift":8,"reason":"Sed ante. Vivamus tortor. Duis mattis egestas metus."},
{"resourceName":"Nessy Schulke","actualShiftDate":"03/31/2022","actualShift":9,"desiredShiftDate":"11/20/2023","desiredShift":9,"reason":"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl."},
{"resourceName":"Anetta Maddrah","actualShiftDate":"08/04/2022","actualShift":10,"desiredShiftDate":"08/17/2023","desiredShift":10,"reason":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."}];

export const loc = [

  {'id':1,'loc':'Banglore'},

  {'id':2,'loc':'Chennai'} ,

  {'id':3,'loc':'Hyderabad'},

  {'id':4,'loc':'Kolkata'},

  {'id':5,'loc':'Mumbai'},

  {'id':6,'loc':'Pune'},

  {'id':7,'loc':'Gurgon'}

];

export const lev = [

  { 'id':1,'lev':'Assosiate Analyst'},

  { 'id':2,'lev':'Analyst'},

  { 'id':3,'lev':'Consultant'},

  { 'id':4,'lev':'Senior Consultant'},

  { 'id':5,'lev':'Manager'},

  { 'id':6,'lev':'Senior Manager'},

  { 'id':7,'lev':'Above senior manager'}

];