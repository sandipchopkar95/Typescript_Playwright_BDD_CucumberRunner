import { transports, format } from "winston";

export function options(scenarioName: string) {
    return {
        transports: [
            new transports.File({
                filename: `test-result/logs/${scenarioName}/log.log`,
                level: "info",
                format: format.combine(
                    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Correct timestamp format
                    format.align(),
                    format.printf(info => `${info.level} : ${info.timestamp} : ${info.message}`)
                ),
            }),
        ],
    };
}

