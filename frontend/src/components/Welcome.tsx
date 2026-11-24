
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  IconChecklist,
  IconCalendarCheck,
  IconTargetArrow,
  IconRocket,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconChecklist,
    title: "Organize your tasks",
    description:
      "Create and manage your tasks in one place. Keep everything organized and easy to find.",
    color: "orange",
  },
  {
    icon: IconCalendarCheck,
    title: "Stay on schedule",
    description:
      "Set dates for your tasks and keep track of what needs to be done and when.",
    color: "green",
  },
  {
    icon: IconTargetArrow,
    title: "Track your progress",
    description:
      "Mark tasks as completed and see how much you've accomplished.",
    color: "blue",
  },
];

export default function Welcome({moveToLogin} : {moveToLogin: () => void | undefined}) {
  return (
    <Container size="lg" py={50}>
      <Paper
        radius="xl"
        p={{ base: "lg", sm: 40 }}
        shadow="sm"
        withBorder
        style={{ overflow: "hidden" }}
      >
        <Stack gap={35}>
          {/* Hero section */}
          <Stack align="center" gap="md" ta="center">
            <Button color="blue" onClick={moveToLogin}>Move to login</Button>
            <ThemeIcon
              size={75}
              radius="xl"
              variant="light"
              color="orange"
            >
              <IconRocket size={38} />
            </ThemeIcon>

            <Badge color="orange" variant="light" size="lg">
              Welcome to My To-dos!
            </Badge>

            <Title order={1} size="2.5rem">
              Make every day <Text span c="orange" inherit>count.</Text>
            </Title>

            <Text c="dimmed" size="lg" maw={550}>
              Your personal space to organize tasks, manage your time,
              and stay focused on what matters most.
            </Text>
          </Stack>

          {/* Features */}
          <Box>
            <Title order={3} ta="center" mb="xl">
              Everything you need to stay organized
            </Title>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Paper
                    key={feature.title}
                    p="lg"
                    radius="lg"
                    withBorder
                    h="100%"
                  >
                    <Stack gap="sm">
                      <ThemeIcon
                        size={48}
                        radius="md"
                        color={feature.color}
                        variant="light"
                      >
                        <Icon size={25} />
                      </ThemeIcon>

                      <Title order={4}>
                        {feature.title}
                      </Title>

                      <Text size="sm" c="dimmed" lh={1.6}>
                        {feature.description}
                      </Text>
                    </Stack>
                  </Paper>
                );
              })}
            </SimpleGrid>
          </Box>

          {/* Bottom message */}
          <Paper
            radius="lg"
            p="lg"
            bg="var(--mantine-color-orange-light)"
          >
            <Group justify="center" gap="sm">
              <ThemeIcon
                variant="transparent"
                color="orange"
                size="lg"
              >
                <IconRocket size={23} />
              </ThemeIcon>

              <Text fw={600} ta="center">
                Ready to get things done? Let's make it happen!
              </Text>
            </Group>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}
