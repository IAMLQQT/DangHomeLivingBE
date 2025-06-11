import { readFileSync } from "fs";
import { join } from "path";
import * as yaml from "js-yaml";
const YAML_CONFIG_FILE = 'config.yaml';

export default () => {
    const config = yaml.load(
        readFileSync(join(__dirname, YAML_CONFIG_FILE,), 'utf8'),
    ) as Record<string, any>;

    config.app.port = process.env.PORT ?? config.app.port;
    config.app.baseUrl = process.env.BASE_URL ?? config.app.baseUrl;
    config.app.secret = process.env.SECRET ?? config.app.secret;
    config.database.mongo.uri = process.env.MONGO_URI ?? config.database.mongo.uri;
    config.security.jwtSecret = process.env.JWT_SECRET ?? config.security.jwtSecret;
    config.mail.pass = process.env.MAIL_PASS ?? config.mail.pass;

    config.throttle.short.ttl =
        process.env.THROTTLE_SHORT_TTL ?? config.throttle.short.ttl;
    config.throttle.short.limit =
        process.env.THROTTLE_SHORT_LIMIT ?? config.throttle.short.limit;
    config.throttle.medium.ttl =
        process.env.THROTTLE_MEDIUM_TTL ?? config.throttle.medium.ttl;
    config.throttle.medium.limit =
        process.env.THROTTLE_MEDIUM_LIMIT ?? config.throttle.medium.limit;
    config.throttle.long.ttl =
        process.env.THROTTLE_LONG_TTL ?? config.throttle.long.ttl;
    config.throttle.long.limit =
        process.env.THROTTLE_LONG_LIMIT ?? config.throttle.long.limit

    console.log("ENV", process.env.NODE_ENV);
    return config;

}

