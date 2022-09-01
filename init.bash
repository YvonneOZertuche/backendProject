# sequelize model:generate --name roles --attributes type:string
# sequelize model:generate --name users --attributes username:string,email:string,password:string,password2:string,roleID:integer,isPublished:boolean
# sequelize model:generate --name blogs --attributes title:string,content:string,isPublished:boolean,userID:integer

# sequelize migration:create --name addColumn 