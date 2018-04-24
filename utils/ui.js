import { Message, MessageBox} from 'element-ui'

var UI = {
  toast : function(message,type){
    let option = {
      'message' : message,
      'duration' : 2200
    };
    if(type == 'error'){
      Message.error(option)
    }
    else if (type == "success"){
      Message.success(option);
    }
    else if (type == "warning"){
      Message.warning(option);
    }
    else{
      Message.info(option);
    }
  },

  confirm : function(ct,title,option){
    return MessageBox.confirm(ct,title,{
      confirmButtonText: option && option.confirmButtonText || '确定',
      cancelButtonText: option && option.cancelButtonText || '取消'
    })
  },

  alert : function(content){
    return MessageBox.alert(content,'提示',{
      confirmButtonText:'确定'
    })
  }

};

export default UI;
