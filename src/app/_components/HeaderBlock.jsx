export default function HeaderBlock({ heading, summaryText }) {
  return (
    <header className="my-4 text-center">
      <h1 className="text-4xl font-black ">{heading}</h1>
      <p className="font-thin">{summaryText}</p>
    </header>
  );
}
