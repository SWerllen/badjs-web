/**
 * Created by coverguo on 2015/01/08.
 */

var http = require('http');

var  log4js = require('log4js'),
    logger = log4js.getLogger();



var ApplyService = function (){
    this.applyDao = global.models.applyDao;
};



ApplyService.prototype = {
    query : function (target , callback){
        if(!target.cmd || target.cmd == ""){
            callback(null, {ret:1002, msg:"缺少cmd参数"});
        }
        if(target.cmd == "get_all_applyList"){
            //管理员
            if(target.user.role ==1){
                this.applyDao.all({} , function (err , items){
                    if(err){
                        callback(err);
                    }
                    callback(null,{ret:0, msg:"success", data: items});
                });
            }else{
                this.applyDao.find({userName: target.user.loginName} , function (err , items){
                    if(err){
                        callback(err);
                    }
                    callback(null,{ret:0, msg:"success", data: items});
                });
            }
        }

    },
    add: function(target, callback){
        if(target.name == "" || target.url ==""){
            callback(null, {ret:1002, msg:"params error"})
        }
        this.applyDao.create(target , function (err , items){
            if(err){
                callback(err);
            }
            logger.info("Insert into b_apply success! target1: ",target);
            callback(null,{ret:0, msg:"success add"});
        });
    },
    remove : function(target, callback){

    },
    update : function(target, callback){
        this.applyDao.find({id: target.id }, function (err, apply) {
            // SQL: "SELECT * FROM b_apply WHERE name = 'xxxx'"
            params[0].each(function(key, value){
                apply[key] = value;
            });
            apply[0].save(function (err) {
                // err.msg = "under-age";
            });
        });
    }
}


module.exports =  ApplyService;

