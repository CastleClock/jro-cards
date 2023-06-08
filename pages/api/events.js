import axios from "axios";
import cheerio from "cheerio";

export default async function events(req, res) {
  try {
    const response = await axios.get(
      "https://www.eventbrite.ca/d/canada--victoria/events--this-week/?page=1"
    );
    const $ = cheerio.load(response.data);

    let events = [];
    $('script[type="application/ld+json"]').each((i, element) => {
      const eventJson = $(element).html();
      const event = JSON.parse(eventJson);

      // map the event object to the desired structure
      const mappedEvent = {
        title: event.name,
        date: event.startDate,
        location: event.location.name,
        imageUrl: event.image,
        eventUrl: event.url,
      };

      events.push(mappedEvent);
    });

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
