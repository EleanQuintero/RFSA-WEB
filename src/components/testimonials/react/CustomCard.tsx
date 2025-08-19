import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../../ui/react/card";

interface CustomCardProps {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  url: string;
}

export const CustomCard = ({
  title,
  subtitle,
  description,
  image,
  url,
}: CustomCardProps) => {
  return (
    <Card className="bg-[var(--gray-300)]shadow-lg hover:scale-110 hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>
          <a href={url}>{title}</a>
        </CardTitle>
        <CardDescription className="text--[var(--gray-900)]">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <a href={url}>
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-48 rounded-lg shadow-sm"
          />
        </a>
      </CardContent>
      <CardFooter>
        <span className="font-bold">{`"${description}"`}</span>
      </CardFooter>
    </Card>
  );
};
