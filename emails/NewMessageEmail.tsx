import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
} from '@react-email/components';

interface NewMessageEmailProps {
    username: string;
    message: string;
}

export default function NewMessageEmail({ username, message }: NewMessageEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>New Whispers Within Message</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>You have a new anonymous message!</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        You have received a new mystery message:
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontStyle: 'italic', color: '#555' }}>
                        {message}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Log in to your dashboard to view all your messages.
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}
