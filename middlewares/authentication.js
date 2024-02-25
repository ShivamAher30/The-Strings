const { ValidateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName)
{
    return (req,res,next)=>
    {
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue)
        {
            next();
        }

        try {
            const userpayload =  ValidateToken(tokenCookieValue);
            req.user = userpayload
            next()
            
        } catch (error) {
            next()
        }

    }
}
module.exports = 
{
    checkForAuthenticationCookie
}