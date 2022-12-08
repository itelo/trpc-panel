import React from "react";
import { ChevronIcon } from "src/react-app/components/icons/ChevronIcon";

export function Chevron({
    className,
    direction,
}: {
    className?: string;
    direction: "up" | "down" | "right";
}) {
    return (
        <ChevronIcon
            className={
                className +
                " " +
                `${(() => {
                    switch (direction) {
                        case "up":
                            return " rotate-90";
                        case "down":
                            return "-rotate-90";
                        case "right":
                            return "rotate-180";
                    }
                })()}`
            }
        />
    );
}
