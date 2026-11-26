import { Card } from "@mantine/core";
import type { ReactNode } from "react";

function GenericCard({ children }: { children: ReactNode }) {
    return (
        <Card
            bg={"#ccddff"}
            radius={"md"}
            p={10}
            withBorder
            bd={"2px solid gray"}
            w={"30vw"}
        >
            {children}
        </Card>
    );
}

export default GenericCard;
