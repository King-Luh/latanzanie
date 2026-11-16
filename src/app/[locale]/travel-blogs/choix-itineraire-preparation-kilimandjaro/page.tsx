import Link from 'next/link'
import '../../../tailgrid.css'
import { getTranslations } from 'next-intl/server'
import TopicCard from '@/components/ui/TopicCard'
import ClientWrapper from './ClientWrapper'

const ids = ['overview','route-role','ascent-rate','difficulty','daily-comfort','weather','success-rate','guide-role']

const FR_TITLES: Record<string,string> = {
  overview: "En quoi le choix de l’itinéraire fait-il partie de la préparation au Kilimandjaro ?",
  'route-role': "L’itinéraire détermine le rythme et l’acclimatation",
  'ascent-rate': 'Montée progressive et nuits en altitude',
  difficulty: 'Le niveau de difficulté selon l’itinéraire',
  'daily-comfort': 'Le confort quotidien dépend du parcours choisi',
  weather: 'Impact de l’itinéraire sur la météo et le terrain',
  'success-rate': 'Le choix influence les chances de succès',
  'guide-role': 'Le rôle clé du guide local'
}

const FR_SECTIONS: Record<string,string> = {
  overview: `Le choix de l’itinéraire est une étape essentielle dans la préparation de l’ascension du Mont Kilimandjaro. Beaucoup de randonneurs se concentrent uniquement sur la condition physique ou l’équipement, mais l’itinéraire influence directement l’acclimatation à l’altitude, la difficulté du trek, le confort quotidien et les chances d’atteindre le sommet. En tant que guide local du Kilimandjaro, je constate chaque saison que les grimpeurs qui choisissent un itinéraire adapté à leur niveau, comme Machame, Lemosho ou Rongai, vivent une expérience plus sûre, plus agréable et nettement plus réussie.

L’itinéraire détermine le rythme de montée et l’acclimatation

L’altitude est le principal défi du Kilimandjaro, bien avant la difficulté technique. Certains itinéraires sont conçus pour offrir une montée progressive, avec suffisamment de temps pour que le corps s’adapte au manque d’oxygène. Par exemple, l’itinéraire Lemosho est reconnu comme l’un des meilleurs pour l’acclimatation, car il commence lentement et inclut plusieurs nuits en altitude avant l’attaque du sommet. L’itinéraire Machame, quant à lui, utilise le principe de « monter haut, dormir bas », ce qui favorise également l’acclimatation, mais demande plus d’efforts physiques quotidiens. À l’inverse, des itinéraires plus directs comme Marangu montent plus rapidement, laissant moins de temps au corps pour s’adapter, ce qui augmente le risque de mal aigu des montagnes si le rythme n’est pas strictement contrôlé. Le choix de l’itinéraire conditionne donc directement la manière dont le corps va réagir à l’altitude.`,

  'route-role': `Le niveau de difficulté varie fortement selon l’itinéraire

Tous les itinéraires du Kilimandjaro ne présentent pas la même difficulté physique. Le Machame est souvent considéré comme plus exigeant, en raison de ses montées et descentes fréquentes et de certaines journées longues. Le Lemosho, bien que plus long en nombre de jours, est plus progressif et généralement mieux toléré par les randonneurs. Le Rongai, situé sur le versant nord, propose une montée plus régulière et moins technique, ce qui peut convenir à des personnes recherchant un effort plus constant. Choisir un itinéraire adapté à sa condition physique permet de gérer l’effort sur la durée et d’éviter un épuisement prématuré qui pourrait compromettre l’ascension.`,

  'ascent-rate': `Montée progressive et nuits en altitude

Des itinéraires comme Lemosho commencent lentement et incluent des journées d’acclimatation; d’autres montent plus directement. Passer davantage de nuits en altitude aide l’organisme à produire plus de globules rouges, améliorant ainsi le transport de l’oxygène dans le sang. Un bon guide local adapte l’itinéraire en fonction du niveau, du rythme et des réactions du groupe.`,

  difficulty: `Le confort quotidien dépend du parcours choisi

Le confort pendant l’ascension dépend fortement de l’itinéraire. Des routes comme Machame et Marangu sont très populaires et donc plus fréquentées, surtout en haute saison. Cela peut rassurer certains randonneurs, mais aussi entraîner plus de bruit et de promiscuité dans les camps. À l’inverse, les itinéraires Lemosho et Rongai sont plus sauvages et offrent une expérience plus calme et immersive en pleine nature. Ce confort psychologique joue un rôle important dans la préparation mentale, car un environnement plus serein aide à mieux gérer la fatigue et à conserver la motivation jour après jour.`,

  'daily-comfort': `L’impact de l’itinéraire sur la météo et les conditions du terrain

Chaque itinéraire traverse des zones climatiques différentes et est exposé différemment aux conditions météo. Le Rongai, situé au nord de la montagne, est généralement plus sec et souvent recommandé pendant la saison des pluies. Le Machame et le Lemosho, qui passent par des zones forestières humides, peuvent être plus boueux et glissants au début de l’ascension. Certains itinéraires sont aussi plus exposés au vent ou au froid en altitude. Choisir un itinéraire adapté à la saison permet de réduire l’inconfort, d’améliorer la sécurité et de mieux anticiper l’équipement nécessaire.`,

  weather: `Le choix de l’itinéraire influence les chances de succès au sommet

Les statistiques montrent clairement que les itinéraires plus longs, offrant une meilleure acclimatation, présentent un taux de réussite plus élevé au sommet du Kilimandjaro. Des itinéraires comme Lemosho et Machame sur 7 ou 8 jours permettent au corps de mieux s’adapter et augmentent considérablement les chances d’atteindre Uhuru Peak en bonne santé. Le choix de l’itinéraire devient donc une décision stratégique, qui influence directement le succès final bien plus que la seule condition physique.`,

  'success-rate': `Le rôle clé du guide local dans le choix de l’itinéraire

Un guide local expérimenté connaît parfaitement les itinéraires du Kilimandjaro, leurs avantages, leurs difficultés et leurs limites. Il sait quel itinéraire recommander selon l’âge, la condition physique, l’expérience en montagne et la période de l’année. Choisir un itinéraire avec l’aide d’un guide local permet d’adapter la préparation de manière réaliste et personnalisée, en mettant toutes les chances de son côté pour une ascension réussie et sécurisée.

Conseil du guide local 🏔️

> « Sur le Kilimandjaro, la réussite ne dépend pas seulement de la force physique, mais du chemin choisi. Un bon itinéraire, bien adapté, est déjà une grande partie du sommet. »` 
}

const EN_TITLES: Record<string,string> = {
  overview: 'How route choice is part of Kilimanjaro preparation',
  'route-role': 'Route role in pace and acclimatization',
  'ascent-rate': 'Ascent rate and nights at altitude',
  difficulty: 'Difficulty varies by route',
  'daily-comfort': 'Daily comfort depends on route',
  weather: 'Route impact on weather and terrain',
  'success-rate': 'Route choice affects summit success',
  'guide-role': 'Guide’s key role'
}

const EN_SECTIONS: Record<string,string> = {
  overview: `Route choice affects acclimatization, difficulty and daily comfort. Progressive routes increase summit chances.`,
  'route-role': `Some routes offer a gentler ascent and more nights at altitude, promoting red blood cell production.`,
  'ascent-rate': `Lemosho starts slowly with acclimatization days; other routes ascend more directly.`,
  difficulty: `Machame is demanding; Lemosho is more gradual; Rongai is steadier—pick by ability.`,
  'daily-comfort': `Route affects campsite crowding and psychological comfort.`,
  weather: `Routes cross different climate zones; Rongai tends to be drier and may suit wet seasons.`,
  'success-rate': `Longer, progressive routes tend to have higher summit success rates.`,
  'guide-role': `An experienced guide recommends the best route based on age, fitness and season.`
}

function render(c:string){return c.split('\n\n').map((b,i)=> b.trim().startsWith('>') ? <blockquote key={i} className="pl-4 border-l-4 italic text-black">{b.replace(/^>\s?/,'')}</blockquote> : <p key={i} className="my-4 text-black">{b}</p>)}

export default async function RouteChoicePage({ params }: { params: Promise<{ locale?: string }> }) {
  const awaitedParams = await params;
  const locale = awaitedParams?.locale || 'fr';
  const t = await getTranslations('BlogPosts.choix-itineraire-preparation-kilimandjaro');
  
  const sections = ids.map((id) => ({
    id,
    title: locale === 'fr' ? FR_TITLES[id] || EN_TITLES[id] : EN_TITLES[id] || FR_TITLES[id],
    content: locale === 'fr' ? FR_SECTIONS[id] || EN_SECTIONS[id] : EN_SECTIONS[id] || FR_SECTIONS[id]
  }))

  return (
    <div className="min-h-screen bg-white">
      <section className="relative hero-wavy bg-cover bg-center text-white py-20 pt-32 md:pt-40" style={{ backgroundImage: "url('/images/preparation-hero.jpg')" }}>
        <div className="absolute inset-0 -z-10">
          <img src="/images/preparation-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4">
          <Link href={`/${locale}/travel-blogs/climb-kilimanjaro#all-topics`} className="text-white mb-6 inline-flex items-center text-sm font-medium">← {locale === 'fr' ? 'Retour aux blogs' : 'Back to blogs'}</Link>
        </div>
      </section>

      <ClientWrapper 
        locale={locale}
        sections={sections}
        FR_TITLES={FR_TITLES}
        EN_TITLES={EN_TITLES}
        FR_SECTIONS={FR_SECTIONS}
        EN_SECTIONS={EN_SECTIONS}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{locale === 'fr' ? 'Prêt pour une aventure ?' : 'Ready for an adventure?'}</h2>
            <p className="text-gray-600 text-lg">Explorez nos meilleures routes du Kilimandjaro</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('/images/marangu-route.jpg')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Marangu Route</h3>
                <p className="text-gray-700 mb-4">Conquérir le Toit de l'Afrique : L'Ascension du Kilimandjaro par la Route Marangu en 5 Jours</p>
                <Link href={`/${locale}/trips/marangu-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium">En savoir plus</Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('/images/lemosho-route.jpg')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Lemosho Route</h3>
                <p className="text-gray-700 mb-4">L'Aventure Panoramique : Itinéraire Lemosho en 7 Jours</p>
                <Link href={`/${locale}/trips/lemosho-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium">En savoir plus</Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('/images/kilimanjaro-umbwe.jpg')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Umbwe Route</h3>
                <p className="text-gray-700 mb-4">L'Itinéraire Umbwe : Le Défi Vertical du Kilimandjaro (6 Jours)</p>
                <Link href={`/${locale}/trips/umbwe-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium">En savoir plus</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
