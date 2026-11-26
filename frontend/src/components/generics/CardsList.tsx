import { Alert, Center, Loader, Stack, Title } from "@mantine/core";
import GenericCard from "./GenericCard";

interface CardsListProps<T extends { id: number }> {
    CardElement: React.ComponentType<{ item: T }>;
    dataList: T[];
    title: string;
    error: string;
    loading: boolean;
}

function CardsList<T extends { id: number }>({
    title,
    dataList,
    CardElement,
    error,
    loading,
}: CardsListProps<T>) {
    return (
        <>
            <Title order={2} p={"1rem"} size={"2rem"}>
                {title}
            </Title>
            <Center>
                {loading ? (
                    <Loader />
                ) : dataList ? (
                    <Stack>
                        {dataList.map((d) => (
                            <GenericCard key={d.id}>
                                <CardElement item={d}/>
                            </GenericCard>
                        ))}
                    </Stack>
                ) : (
                    error && <Alert color="red">{error}</Alert>
                )}
            </Center>
        </>
    );
}

export default CardsList;
