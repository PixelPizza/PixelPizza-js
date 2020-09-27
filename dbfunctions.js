const{default: Db}=require('mysql2-async');
const{baseexp,addexp}=require('./level.json');
const{host,user,password,database}=require('./database.json');
const{botGuild}=require('./config.json');
const{levelRoles}=require('./roles.json');
const{addRole,removeRole,hasRole}=require('./functions');
const db_config={host:host,user:user,password:password,database:database,skiptzfix:true};
let db;function handleError(){try{db=new Db(db_config);}catch(error){if(error.sqlMessage=="Unknown or incorrect time zone: 'UTC'"){setTimeout(handleError,100);}else{throw error;}}}handleError();
exports.query=async(query,options=[])=>{return db.query(query,options);}
exports.addUser=async(userId)=>{if(isNaN(userId)||userId.length!=18)return;const result=await this.query(`SELECT * FROM \`user\` WHERE userId = ?`,[userId]);if(result.length)return;this.query(`INSERT INTO \`user\`(userId) VALUES(?)`,[userId]);}
exports.addExp=(client,userId,amount)=>{if(isNaN(userId)||userId.length!=18||isNaN(amount))return;this.query(`UPDATE \`user\` SET exp = exp + ? WHERE userId = ?`,[amount,userId]).then(()=>{this.checkLevel(client,userId);});}
exports.checkLevel=async(client,userId)=>{
    if(isNaN(userId)||userId.length!=18)return;
    const result=await this.query("SELECT exp, `level` FROM user WHERE userId = ?",[userId]);
    if(!result.length)return;
    const exp=result[0].exp;
    let level=result[0].level;
    while(true){
        let expNeeded=baseexp*(level+1)+addexp*level;
        let expNeededPrev=baseexp*level+addexp*(level-1);
        if(exp<expNeededPrev){
            level--;
        }else if(exp>=expNeeded){
            level++;
        }else{
            break;
        }
    }
    this.query("UPDATE user SET `level` = ? WHERE userId = ?",[level,userId]).then(()=>{
        this.checkLevelRoles(client,userId);
    });
}
exports.checkLevelRoles=async(client,userId)=>{
    if(isNaN(userId)||userId.length!=18)return;
    const result=await this.query("SELECT `level` FROM user WHERE userId = ?",[userId]);
    if(!result.length)return;
    const level=result[0].level;
    const guild=client.guilds.cache.get(botGuild);
    const member=guild.members.cache.get(userId);
    if(level>=5&&!hasRole(member,levelRoles.five)){
        addRole(member,levelRoles.five);
    }else if(level<5&&hasRole(member,levelRoles.five)){
        removeRole(member,levelRoles.five);
    }
    if(level>=10&&!hasRole(member,levelRoles.ten)){
        addRole(member,levelRoles.ten);
    }else if(level<10&&hasRole(member,levelRoles.ten)){
        removeRole(member,levelRoles.ten);
    }
    if(level>=25&&!hasRole(member,levelRoles.twentyfive)){
        addRole(member,levelRoles.twentyfive);
    }else if(level<25&&hasRole(member,levelRoles.twentyfive)){
        removeRole(member,levelRoles.twentyfive);
    }
    if(level>=50&&!hasRole(member,levelRoles.fifty)){
        addRole(member,levelRoles.fifty);
    }else if(level<50&&hasRole(member,levelRoles.fifty)){
        removeRole(member,levelRoles.fifty);
    }
    if(level>=100&&!hasRole(member,levelRoles.hundered)){
        addRole(member,levelRoles.hundered);
    }else if(level<100&&hasRole(member,levelRoles.hundered)){
        removeRole(member,levelRoles.hundered);
    }
}
