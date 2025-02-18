import aj from '../config/arcjet.config.js';

const arcjetMiddleware = async(req, res, next) => {
    try{
        const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
        console.log("Arcjet decision", decision);

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({ message: 'Rate limit exceeded' });
            if(decision.reason.isBot()) return res.status(403).json({ message: 'Bot detected' });

            return res.status(403).json({ error: "Access Denied" });
        }

        next();

    }catch(error){
        console.log("An error occurred in the arcjet middleware", error);
        next(error);
    }
};

export default arcjetMiddleware;