import { Center, Flex, Paper, Title } from '@mantine/core'
import type { ReactNode } from 'react';

interface GenericFormCardProps {
    title: string,
    form: ReactNode,
    addButton?: ReactNode
}


function GenericFormCard({title, form, addButton}: GenericFormCardProps) {
  return (
    <Center h={"88vh"}>

            <Paper
                shadow="md"
                p={"lg"}
                radius={"md"}
                w={400}
                mt={20}
                withBorder
                bg={"#bbddff"}
                >
                <Flex direction={"column"} gap={"lg"} justify={"center"}>
                    <Title order={2} p={10}>
                        {title}
                    </Title>
                    {form}
                    {addButton}
                </Flex>
            </Paper>
    </Center>
    );
}


export default GenericFormCard