import HeaderBlock from "./_components/HeaderBlock";

export default function App() {
  const details = {
    appTitle: "Social Planner",
    appDescription:
      "Manage and master all your upcoming social media content and campaigns in one place.",
  };

  return (
    <HeaderBlock
      heading={details.appTitle}
      summaryText={details.appDescription}
    />
  );
}
