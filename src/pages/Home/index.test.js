import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import ServiceCard from "../../components/ServiceCard";
import EventList from "../../containers/Events";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import Icon from "../../components/Icon";
import Page from "./index";
import { DataProvider } from "../../contexts/DataContext";






describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<EventList />);
    const EventElement = screen.getByText("Catégories");
    expect(EventElement).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    render(
      <PeopleCard imageSrc="http://src-image" imageAlt="image-alt-text"
        name="test name"
        position="test position" />
    );
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });

  it("a list of service is displayed", () => {
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
        <div data-testid="ServiceCard__textContainer">Contenu du texte</div>
      </ServiceCard>
    );

    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");

    const contentElement = screen.getByTestId("ServiceCard__textContainer");
    expect(contentElement.textContent).toEqual("Contenu du texte");

  });

  it("a footer is displayed", () => {
    render(<Icon name="twitch" />);
    const IconElement = screen.getByTestId("icon");
    expect(IconElement).toBeInTheDocument();
  });


  it("an event card, with the last event, is displayed", () => {
    const eventData = {
      imageSrc: "/chemin/vers/image.jpg",
      imageAlt: "Description de l'image",
      date: new Date("2023-12-01"),
      title: "Événement Test",
      label: "boom",
    };

    render(<EventCard {...eventData} />);
    const eventCard = screen.getByTestId("card-testid");
    expect(eventCard).toBeInTheDocument();

  });
});
describe("Page component", () => {
  it("renders the header with the Menu component", () => {
    render(<Page />);
  });
});
const mockData = {
  events: [
    {
      imageSrc: 'http://src-image',
      imageAlt: 'image',
      date: new Date('2023-12-01'),
      title: 'Événement Test 1',
      label: 'boom',
    },
  ],
  services: [
    {
      imageSrc: 'http://src-image',
      imageAlt: 'image-alt-text',
    },
  ],
  realisations: [
    {
      imageSrc: 'http://src-image',
      imageAlt: 'image-alt-text',
      title: 'Soirée d’entreprise',
      description: 'Une soirée d’entreprise vous permet de réunir vos équipes...',
    },
  ],
  teamMembers: [
    {
      imageSrc: '/path/to/member1.jpg',
      name: 'Samira',
      position: 'CEO',
    },
  ],
};

describe('Page d\'accueil', () => {
  it('Affiche correctement le menu', async () => {
    render(
      <DataProvider data={mockData}>
        <Page />
      </DataProvider>
    );
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Nos services' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Nos réalisations' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Notre équipe' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
    });
  });
  it('Affiche correctement la section "Nos services"', () => {
    render(
      <DataProvider data={mockData}>
        <Page />
      </DataProvider>
    );

    // Vérifie que la section "Nos services" est présente et contient les éléments attendus
    expect(screen.getByRole('heading', { name: 'Nos services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Soirée d’entreprise' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Conférences' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience digitale' })).toBeInTheDocument();
  });

  it('Affiche correctement la section "Nos réalisations"', () => {
    render(
      <DataProvider data={mockData}>
        <Page />
      </DataProvider>
    );

    // Vérifie que la section "Nos réalisations" est présente et contient les éléments attendus
    expect(screen.getByRole('heading', { name: 'Nos réalisations' })).toBeInTheDocument();
  });

  it('Affiche correctement la section "Notre équipe"', () => {
    render(
      <DataProvider data={mockData}>
        <Page />
      </DataProvider>
    );

    // Vérifie que la section "Notre équipe" est présente et contient les éléments attendus
    expect(screen.getByRole('heading', { name: 'Notre équipe' })).toBeInTheDocument();

  });
  it('Affiche correctement le footer', () => {
    render(
      <DataProvider>
        <Page />
      </DataProvider>
    );

    // Vérifie que des éléments spécifiques du footer sont présents
    expect(screen.getByText('Notre derniére prestation')).toBeInTheDocument();
    expect(screen.getByText('Contactez-nous')).toBeInTheDocument();
  });
});