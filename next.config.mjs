import { server } from "typescript";

const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com',
             }
        
    ]
},


};

export default nextConfig;