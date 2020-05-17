module.exports = {
  isAlphaNumericOnly : function (input)
  {
      var letterNumberRegex = /^[0-9a-zA-Z]+$/;
      if(input.match(letterNumberRegex))
      {
          return true;
      }
      return false;
  },
  isLongEnough : function (input){
      if(input.length >= 8){
          return true;
      }
      return false;
  },

  isGoodPassword : function (input)
  {
      var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return regex.test(input) ;
  },

  isSafe: function (input)
    {
        var regex = /([$])/;
        return !regex.test(input);
    }
}
