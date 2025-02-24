import {
  AutoplayCarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { FeaturedPlayerCard } from "@/components/page/featured-player-card"
import { SponsorCard } from "@/components/page/sponsor-card"
import preotu from "@/assets/img/preotu.jpg"
import poltkin from "@/assets/img/plotkin.jpg"
import { GhentLogo } from "./ghent-logo"

export default function Home() {
  return (
    <div className="px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw] space-y-4">
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-1 items-end">
            <h2 className="font-bold text-xl">Contact:</h2>
            <a
              href="mailto:2025ontarioopen@gmail.com"
              className="text-blue-500 hover:underline"
            >
              2025ontarioopen@gmail.com
            </a>
          </div>
          <div>
            <h2 className="font-bold text-xl">Date and Location:</h2>
            <p>
              Saturday, May 17 &ndash; Monday, May 19, 2025, 10 am &ndash; 4 pm
            </p>
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              href="https://www.google.ca/maps/place/Best+Western+Brantford+Hotel+and+Conference+Centre/@43.1640289,-80.2438909,17z/data=!4m9!3m8!1s0x882c65b7d0ed6319:0x6a46105bfa725c86!5m2!4m1!1i2!8m2!3d43.164025!4d-80.241316!16s%2Fg%2F1tmxg5r7?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D"
            >
              Best Western 19 Holiday Dr., Brantford, ON
            </a>
          </div>
          <div>
            <h2 className="font-bold text-xl">Format and Time Controls:</h2>
            <p>6 Round Swiss</p>
            <p>90 minutes + 30 second bonus</p>
            <b>Active CFC membership required</b>
          </div>
          <div>
            <h2 className="font-bold text-xl">Byes:</h2>
            <p>
              Half point byes must be requested before the previous round has
              started
            </p>
            <p>Maximum two half point byes in rounds 1 &ndash; 4 only</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Tournament Directors:</h2>
            <p>Anabelle Kovatcheva and Lee Hendon</p>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-bold text-xl">Sections:</h2>
            <ul className="list-disc pl-4">
              <li>2000 and Above (FIDE and CFC rated)</li>
              <li>1600 &ndash; 1999 (FIDE and CFC rated)</li>
              <li>1200 &ndash; 1599 (CFC rated only)</li>
              <li>U1200 and Unrated (CFC rated only)</li>
            </ul>
            <b>
              Sections are based on the most current rating before the
              tournament (Higher of FIDE, CFC / USCF)
            </b>
          </div>
          <div>
            <h2 className="font-bold text-xl">Projected Prize Fund:</h2>
            <p>$15,000 based on 250 paid entries</p>
            <p>$10,000 based on 200 paid entries</p>
            <p>$7,000 based on 150 paid entries</p>
            <h3 className="font-bold text-lg">Percentage / Section:</h3>
            <p>2000 and Above: 40%</p>
            <p>1600 &ndash; 1999: 30%</p>
            <p>1200 &ndash; 1599: 20%</p>
            <p>U1200 and Unrated: 10%</p>
            <h3 className="font-bold text-lg">
              $1,500 Guaranteed First Place Prize
            </h3>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="font-bold text-xl">Fees:</h2>
            <p>GM / WGM: Free entry</p>
            <p>
              IM / WIM / FIDE 2400+: Free entry before April 21, 2025; $60 after
              (no additional discounts)
            </p>
            <p className="line-through">Early: $100 before January 1, 2025</p>
            <p>Regular: $110 January 1 &ndash; April 20, 2025</p>
            <p>Late: $120 April 21 &ndash; May 15, 2025</p>
            <p>
              Onsite: $130 After May 15, 2025; cash only (may receive a round
              one bye)
            </p>
            <h3 className="font-bold text-lg">Play Up Fee:</h3>
            <p>$20 (must be within 100 points of next section up)</p>
            <div className="flex gap-1 items-center">
              <h3 className="font-bold text-lg">$10 Discounts:</h3>
              <p className="text-muted-foreground text-sm">(Maximum $20)</p>
            </div>
            <ul className="list-disc pl-4">
              <li>Junior: Born in or after 2005</li>
              <li>Senior: Born in or before 1960</li>
              <li>Female</li>
              <li>FIDE Master</li>
            </ul>
            <h3 className="font-bold text-lg">Refunds:</h3>
            <ul className="list-disc pl-4">
              <li>Must be requested on or before Thursday, May 15, 2025</li>
              <li>Will include a non-refundable service charge of 3.2%</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex-1 space-y-4">
          <h2 className="text-center font-bold text-xl">Featured Players</h2>
          <AutoplayCarousel
            className="w-full"
            opts={{ loop: true }}
            autoplaySpeed={6000}
          >
            <CarouselContent>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Razvan Preotu"
                  title="Grandmaster"
                  image={preotu}
                  description="
                Born in 1999 in Toronto, Canada, Razvan Preotu started playing chess young; his first organized tournament was at age seven
                —the Grade 2 Chess'n Math Association event in Toronto. At ten, he started formal lessons and quickly progressed.
                He earned the National Master title in 2013, became a FIDE Master later that year, and achieved the International Master title in 2014.
                Preotu earned his Grandmaster title in 2016, becoming the second youngest Canadian-born GM. Some of his top achievements include
                getting first at the 2016 Calgary International, tying for first at the 2017 Canadian Open Master, getting first at the 2018 Quebec Open,
                and being the top Canadian scorer at the 2022 and 2024 Chess Olympiad."
                />
              </CarouselItem>
              <CarouselItem>
                <FeaturedPlayerCard
                  name="Mark Plotkin"
                  title="International Master"
                  image={poltkin}
                  description="
                Mark Plotkin is a distinguished Canadian chess player and coach, holding the FIDE title of International Master and ranking 27th among active
                players in the country. His chess journey began with his father, Victor Plotkin, a strong FIDE Master and captain of several Canadian Olympiad teams.
                Mark studied Political Science and Journalism at the University of Toronto, where he joined the Hart House Chess Club and helped the team
                win the Canadian University Chess Championship. He won the Canadian Banff Chess Tournament during the pandemic and finished fifth in the
                Titled Tuesday Tournament against 340 titled players, beating several top grandmasters. Embracing a full-time role as a chess teacher,
                Mark has produced several Canadian Champions and FIDE titleholders."
                />
              </CarouselItem>
            </CarouselContent>
          </AutoplayCarousel>
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-center font-bold text-xl">
            Sponsors & Donations
          </h2>
          <AutoplayCarousel
            className="w-full"
            opts={{ loop: true }}
            autoplaySpeed={6000}
          >
            <CarouselContent>
              <CarouselItem>
                <SponsorCard
                  Logo={GhentLogo}
                  description="Thank you for donating $5,000!"
                  href="https://ghentautomation.com/"
                />
              </CarouselItem>
            </CarouselContent>
          </AutoplayCarousel>
        </div>
      </div>
    </div>
  )
}
