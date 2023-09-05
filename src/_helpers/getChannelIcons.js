export default function getChannelIcon(channelType) {
  let thumb = "";
  switch (channelType) {
    case "youtube":
      thumb = "/assets/images/youtube.png";
      break;
    case "instagram":
      thumb = "/assets/images/instagram.png";
      break;
    case "facebook":
      thumb = "/assets/images/facebook.png";
      break;
    case "twitch":
      thumb = "/assets/images/twitch.png";
      break;
    case "twitter":
      thumb = "/assets/images/twitter.png";
      break;
    default:
      thumb = "/assets/images/placeholder.png";
      break;
  }
  return thumb;
}
