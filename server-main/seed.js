const mongoose = require("mongoose");
const Country = require("./models/Country");
const Club = require("./models/ClubTeam");
const Position = require("./models/Position");
const NationalTeam = require("./models/NationalTeams");
const Player = require("./models/Player");
const Match = require("./models/Match");
require("dotenv").config();

const positions = [
  "Attacking Midfield",
  "Center Forward",
  "Central Midfield",
  "Centre Back",
  "Coach",
  "Defensive Midfield",
  "Goalkeeper",
  "Left Back",
  "Left Winger",
  "Right Back",
  "Right Winger",
  "Second Stricker",
];
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Côte d’Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "England",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Northern Ireland",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Scotland",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "South Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "The Bahamas",
  "The Gambia",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Wales",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const firstNames = [
  "Marcus",
  "James",
  "Robert",
  "Michael",
  "William",
  "David",
  "John",
  "Richard",
  "Thomas",
  "Charles",
  "Daniel",
  "Matthew",
  "Anthony",
  "Donald",
  "Steven",
  "Paul",
  "Andrew",
  "Joshua",
  "Kenneth",
  "Kevin",
  "Brian",
  "George",
  "Timothy",
  "Ronald",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Thompson",
  "White",
  "Harris",
];
const nationalTeams = [
  { Afghanistan: ["U-17", "U-19", "U-21", "A"] },
  { Albania: ["U-17", "U-19", "U-21", "A"] },
  { Algeria: ["U-17", "U-19", "U-21", "A"] },
  { Andorra: ["U-17", "U-19", "U-21", "A"] },
  { Angola: ["U-17", "U-19", "U-21", "A"] },
  { "Antigua and Barbuda": ["U-17", "U-19", "U-21", "A"] },
  { Argentina: ["U-17", "U-19", "U-21", "A"] },
  { Armenia: ["U-17", "U-19", "U-21", "A"] },
  { Australia: ["U-17", "U-19", "U-21", "A"] },
  { Austria: ["U-17", "U-19", "U-21", "A"] },
  { Azerbaijan: ["U-17", "U-19", "U-21", "A"] },
  { Bahrain: ["U-17", "U-19", "U-21", "A"] },
  { Bangladesh: ["U-17", "U-19", "U-21", "A"] },
  { Barbados: ["U-17", "U-19", "U-21", "A"] },
  { Belarus: ["U-17", "U-19", "U-21", "A"] },
  { Belgium: ["U-17", "U-19", "U-21", "A"] },
  { Belize: ["U-17", "U-19", "U-21", "A"] },
  { Benin: ["U-17", "U-19", "U-21", "A"] },
  { Bhutan: ["U-17", "U-19", "U-21", "A"] },
  { Bolivia: ["U-17", "U-19", "U-21", "A"] },
  { "Bosnia and Herzegovina": ["U-17", "U-19", "U-21", "A"] },
  { Botswana: ["U-17", "U-19", "U-21", "A"] },
  { Brazil: ["U-17", "U-19", "U-21", "A"] },
  { Brunei: ["U-17", "U-19", "U-21", "A"] },
  { Bulgaria: ["U-17", "U-19", "U-21", "A"] },
  { "Burkina Faso": ["U-17", "U-19", "U-21", "A"] },
  { Burundi: ["U-17", "U-19", "U-21", "A"] },
  { "Cabo Verde": ["U-17", "U-19", "U-21", "A"] },
  { Cambodia: ["U-17", "U-19", "U-21", "A"] },
  { Cameroon: ["U-17", "U-19", "U-21", "A"] },
  { Canada: ["U-17", "U-19", "U-21", "A"] },
  { "Central African Republic": ["U-17", "U-19", "U-21", "A"] },
  { Chad: ["U-17", "U-19", "U-21", "A"] },
  { Chile: ["U-17", "U-19", "U-21", "A"] },
  { China: ["U-17", "U-19", "U-21", "A"] },
  { Colombia: ["U-17", "U-19", "U-21", "A"] },
  { Comoros: ["U-17", "U-19", "U-21", "A"] },
  { "Congo, Democratic Republic of the": ["U-17", "U-19", "U-21", "A"] },
  { "Congo, Republic of the": ["U-17", "U-19", "U-21", "A"] },
  { "Costa Rica": ["U-17", "U-19", "U-21", "A"] },
  { "Côte d’Ivoire": ["U-17", "U-19", "U-21", "A"] },
  { Croatia: ["U-17", "U-19", "U-21", "A"] },
  { Cuba: ["U-17", "U-19", "U-21", "A"] },
  { Cyprus: ["U-17", "U-19", "U-21", "A"] },
  { "Czech Republic": ["U-17", "U-19", "U-21", "A"] },
  { Denmark: ["U-17", "U-19", "U-21", "A"] },
  { Djibouti: ["U-17", "U-19", "U-21", "A"] },
  { Dominica: ["U-17", "U-19", "U-21", "A"] },
  { "Dominican Republic": ["U-17", "U-19", "U-21", "A"] },
  { "East Timor (Timor-Leste)": ["U-17", "U-19", "U-21", "A"] },
  { Ecuador: ["U-17", "U-19", "U-21", "A"] },
  { Egypt: ["U-17", "U-19", "U-21", "A"] },
  { "El Salvador": ["U-17", "U-19", "U-21", "A"] },
  { "Equatorial Guinea": ["U-17", "U-19", "U-21", "A"] },
  { Eritrea: ["U-17", "U-19", "U-21", "A"] },
  { Estonia: ["U-17", "U-19", "U-21", "A"] },
  { Eswatini: ["U-17", "U-19", "U-21", "A"] },
  { Ethiopia: ["U-17", "U-19", "U-21", "A"] },
  { Fiji: ["U-17", "U-19", "U-21", "A"] },
  { Finland: ["U-17", "U-19", "U-21", "A"] },
  { France: ["U-17", "U-19", "U-21", "A"] },
  { Gabon: ["U-17", "U-19", "U-21", "A"] },
  { Georgia: ["U-17", "U-19", "U-21", "A"] },
  { Germany: ["U-17", "U-19", "U-21", "A"] },
  { Ghana: ["U-17", "U-19", "U-21", "A"] },
  { Greece: ["U-17", "U-19", "U-21", "A"] },
  { Grenada: ["U-17", "U-19", "U-21", "A"] },
  { Guatemala: ["U-17", "U-19", "U-21", "A"] },
  { Guinea: ["U-17", "U-19", "U-21", "A"] },
  { "Guinea-Bissau": ["U-17", "U-19", "U-21", "A"] },
  { Guyana: ["U-17", "U-19", "U-21", "A"] },
  { Haiti: ["U-17", "U-19", "U-21", "A"] },
  { Honduras: ["U-17", "U-19", "U-21", "A"] },
  { Hungary: ["U-17", "U-19", "U-21", "A"] },
  { Iceland: ["U-17", "U-19", "U-21", "A"] },
  { India: ["U-17", "U-19", "U-21", "A"] },
  { Indonesia: ["U-17", "U-19", "U-21", "A"] },
  { Iran: ["U-17", "U-19", "U-21", "A"] },
  { Iraq: ["U-17", "U-19", "U-21", "A"] },
  { Ireland: ["U-17", "U-19", "U-21", "A"] },
  { Israel: ["U-17", "U-19", "U-21", "A"] },
  { Italy: ["U-17", "U-19", "U-21", "A"] },
  { Jamaica: ["U-17", "U-19", "U-21", "A"] },
  { Japan: ["U-17", "U-19", "U-21", "A"] },
  { Jordan: ["U-17", "U-19", "U-21", "A"] },
  { Kazakhstan: ["U-17", "U-19", "U-21", "A"] },
  { Kenya: ["U-17", "U-19", "U-21", "A"] },
  { Kiribati: ["U-17", "U-19", "U-21", "A"] },
  { "Korea, North": ["U-17", "U-19", "U-21", "A"] },
  { "Korea, South": ["U-17", "U-19", "U-21", "A"] },
  { Kosovo: ["U-17", "U-19", "U-21", "A"] },
  { Kuwait: ["U-17", "U-19", "U-21", "A"] },
  { Kyrgyzstan: ["U-17", "U-19", "U-21", "A"] },
  { Laos: ["U-17", "U-19", "U-21", "A"] },
  { Latvia: ["U-17", "U-19", "U-21", "A"] },
  { Lebanon: ["U-17", "U-19", "U-21", "A"] },
  { Lesotho: ["U-17", "U-19", "U-21", "A"] },
  { Liberia: ["U-17", "U-19", "U-21", "A"] },
  { Libya: ["U-17", "U-19", "U-21", "A"] },
  { Liechtenstein: ["U-17", "U-19", "U-21", "A"] },
  { Lithuania: ["U-17", "U-19", "U-21", "A"] },
  { Luxembourg: ["U-17", "U-19", "U-21", "A"] },
  { Madagascar: ["U-17", "U-19", "U-21", "A"] },
  { Malawi: ["U-17", "U-19", "U-21", "A"] },
  { Malaysia: ["U-17", "U-19", "U-21", "A"] },
  { Maldives: ["U-17", "U-19", "U-21", "A"] },
  { Mali: ["U-17", "U-19", "U-21", "A"] },
  { Malta: ["U-17", "U-19", "U-21", "A"] },
  { "Marshall Islands": ["U-17", "U-19", "U-21", "A"] },
  { Mauritania: ["U-17", "U-19", "U-21", "A"] },
  { Mauritius: ["U-17", "U-19", "U-21", "A"] },
  { Mexico: ["U-17", "U-19", "U-21", "A"] },
  { "Micronesia, Federated States of": ["U-17", "U-19", "U-21", "A"] },
  { Moldova: ["U-17", "U-19", "U-21", "A"] },
  { Monaco: ["U-17", "U-19", "U-21", "A"] },
  { Mongolia: ["U-17", "U-19", "U-21", "A"] },
  { Montenegro: ["U-17", "U-19", "U-21", "A"] },
  { Morocco: ["U-17", "U-19", "U-21", "A"] },
  { Mozambique: ["U-17", "U-19", "U-21", "A"] },
  { "Myanmar (Burma)": ["U-17", "U-19", "U-21", "A"] },
  { Namibia: ["U-17", "U-19", "U-21", "A"] },
  { Nauru: ["U-17", "U-19", "U-21", "A"] },
  { Nepal: ["U-17", "U-19", "U-21", "A"] },
  { Netherlands: ["U-17", "U-19", "U-21", "A"] },
  { "New Zealand": ["U-17", "U-19", "U-21", "A"] },
  { Nicaragua: ["U-17", "U-19", "U-21", "A"] },
  { Niger: ["U-17", "U-19", "U-21", "A"] },
  { Nigeria: ["U-17", "U-19", "U-21", "A"] },
  { "North Macedonia": ["U-17", "U-19", "U-21", "A"] },
  { Norway: ["U-17", "U-19", "U-21", "A"] },
  { Oman: ["U-17", "U-19", "U-21", "A"] },
  { Pakistan: ["U-17", "U-19", "U-21", "A"] },
  { Palau: ["U-17", "U-19", "U-21", "A"] },
  { Panama: ["U-17", "U-19", "U-21", "A"] },
  { "Papua New Guinea": ["U-17", "U-19", "U-21", "A"] },
  { Paraguay: ["U-17", "U-19", "U-21", "A"] },
  { Peru: ["U-17", "U-19", "U-21", "A"] },
  { Philippines: ["U-17", "U-19", "U-21", "A"] },
  { Poland: ["U-17", "U-19", "U-21", "A"] },
  { Portugal: ["U-17", "U-19", "U-21", "A"] },
  { Qatar: ["U-17", "U-19", "U-21", "A"] },
  { Romania: ["U-17", "U-19", "U-21", "A"] },
  { Russia: ["U-17", "U-19", "U-21", "A"] },
  { Rwanda: ["U-17", "U-19", "U-21", "A"] },
  { "Saint Kitts and Nevis": ["U-17", "U-19", "U-21", "A"] },
  { "Saint Lucia": ["U-17", "U-19", "U-21", "A"] },
  { "Saint Vincent and the Grenadines": ["U-17", "U-19", "U-21", "A"] },
  { Samoa: ["U-17", "U-19", "U-21", "A"] },
  { "San Marino": ["U-17", "U-19", "U-21", "A"] },
  { "Sao Tome and Principe": ["U-17", "U-19", "U-21", "A"] },
  { "Saudi Arabia": ["U-17", "U-19", "U-21", "A"] },
  { Senegal: ["U-17", "U-19", "U-21", "A"] },
  { Serbia: ["U-17", "U-19", "U-21", "A"] },
  { Seychelles: ["U-17", "U-19", "U-21", "A"] },
  { "Sierra Leone": ["U-17", "U-19", "U-21", "A"] },
  { Singapore: ["U-17", "U-19", "U-21", "A"] },
  { Slovakia: ["U-17", "U-19", "U-21", "A"] },
  { Slovenia: ["U-17", "U-19", "U-21", "A"] },
  { "Solomon Islands": ["U-17", "U-19", "U-21", "A"] },
  { Somalia: ["U-17", "U-19", "U-21", "A"] },
  { "South Africa": ["U-17", "U-19", "U-21", "A"] },
  { Spain: ["U-17", "U-19", "U-21", "A"] },
  { "Sri Lanka": ["U-17", "U-19", "U-21", "A"] },
  { Sudan: ["U-17", "U-19", "U-21", "A"] },
  { "South Sudan": ["U-17", "U-19", "U-21", "A"] },
  { Suriname: ["U-17", "U-19", "U-21", "A"] },
  { Sweden: ["U-17", "U-19", "U-21", "A"] },
  { Switzerland: ["U-17", "U-19", "U-21", "A"] },
  { Syria: ["U-17", "U-19", "U-21", "A"] },
  { Taiwan: ["U-17", "U-19", "U-21", "A"] },
  { Tajikistan: ["U-17", "U-19", "U-21", "A"] },
  { Tanzania: ["U-17", "U-19", "U-21", "A"] },
  { Thailand: ["U-17", "U-19", "U-21", "A"] },
  { "The Bahamas": ["U-17", "U-19", "U-21", "A"] },
  { "The Gambia": ["U-17", "U-19", "U-21", "A"] },
  { Togo: ["U-17", "U-19", "U-21", "A"] },
  { Tonga: ["U-17", "U-19", "U-21", "A"] },
  { "Trinidad and Tobago": ["U-17", "U-19", "U-21", "A"] },
  { Tunisia: ["U-17", "U-19", "U-21", "A"] },
  { Turkey: ["U-17", "U-19", "U-21", "A"] },
  { Turkmenistan: ["U-17", "U-19", "U-21", "A"] },
  { Tuvalu: ["U-17", "U-19", "U-21", "A"] },
  { Uganda: ["U-17", "U-19", "U-21", "A"] },
  { Ukraine: ["U-17", "U-19", "U-21", "A"] },
  { "United Arab Emirates": ["U-17", "U-19", "U-21", "A"] },
  { "United Kingdom": ["U-17", "U-19", "U-21", "A"] },
  { "United States": ["U-17", "U-19", "U-21", "A"] },
  { Uruguay: ["U-17", "U-19", "U-21", "A"] },
  { Uzbekistan: ["U-17", "U-19", "U-21", "A"] },
  { Vanuatu: ["U-17", "U-19", "U-21", "A"] },
  { "Vatican City": ["U-17", "U-19", "U-21", "A"] },
  { Venezuela: ["U-17", "U-19", "U-21", "A"] },
  { Vietnam: ["U-17", "U-19", "U-21", "A"] },
  { Yemen: ["U-17", "U-19", "U-21", "A"] },
  { Zambia: ["U-17", "U-19", "U-21", "A"] },
  { Zimbabwe: ["U-17", "U-19", "U-21", "A"] },
];
const clubs = [
  "A Italiano",
  "A Klagenfurt",
  "Aalborg",
  "Aarhus",
  "Abahani",
  "Aberdeen",
  "Abha",
  "AC Milan",
  "Academica",
  "Academico Viseu",
  "Adana Demirspor",
  "Admira",
  "AEK",
  "AEK Larnaca",
  "Aguilas",
  "Ajax",
  "Akhmat Grozny",
  "Akron",
  "Al Ahli (Egy)",
  "Al Ahli (KSA)",
  "Al Ain (UAE)",
  "Al Akhdoud",
  "Al Batin (KSA)",
  "Al Ettifaq",
  "Al Feiha (KSA)",
  "Al Gharafa (Qat)",
  "Al Hazem",
  "Al Hilal (KSA)",
  "Al Ittihad",
  "Al Jazira (UAE)",
  "Al Khaleej (KSA)",
  "Al Khor (Qat)",
  "Al Merreick (Sudan)",
  "Al Nasr (UAE)",
  "Al Nassr",
  "Al Raed",
  "Al Rayvan (Qat)",
  "Al Riyadh",
  "Al Sadd",
  "Al Safa",
  "Al Shabab (KSA)",
  "Al Taawon (KSA)",
  "Al Taraji (KSA)",
  "Al Wasl (UAE)",
  "Alacranes",
  "Alajuelense",
  "Alanyaspor",
  "Alaves",
  "Albacete",
  "ALBANIA",
  "Aldosivi",
  "Algeria",
  "Al-Hilal Omdurman",
  "Alianza",
  "Alianza Lima",
  "Almeria",
  "Alvarado",
  "Alverca",
  "Always Ready",
  "Amazonas",
  "Ameliano",
  "America Cali",
  "America MG",
  "Amiens",
  "Amorebieta",
  "Anapolina",
  "Anapolis",
  "Anderlecht",
  "Angers",
  "Ankarugucu",
  "Anorthosis",
  "Antalyaspor",
  "Antwerp",
  "APOEL",
  "Apollon Larissa",
  "Apollon Limassol",
  "Apollon Smyrnis",
  "Arandina",
  "Ararat",
  "ARGENTINA",
  "Argentinos Jrs",
  "Aris",
  "Arminia Bielefeld",
  "Arouca",
  "Arsenal",
  "Arsenal Sarandi",
  "Arsenal U21",
  "Asan",
  "Ascoli",
  "Asteras",
  "Aston Villa",
  "Aston Villa U21",
  "Atalanta",
  "Ath Bilbao",
  "Athletico-PR",
  "Atl Madrid",
  "Atl Nacional",
  "Atl. San Luis",
  "Atlanta United",
  "Atlas",
  "Atletico GO",
  "Atletico MG",
  "Atromitos",
  "Augsburg",
  "Aurora",
  "Austin",
  "AUSTRALIA",
  "AUSTRIA",
  "Austria Vienna",
  "Auxerre",
  "Avai",
  "Avelino",
  "Aves",
  "AZ Alkmaar",
  "B SAD",
  "Backa Topola",
  "Bahia",
  "Balingen",
  "Baltika",
  "Banfield",
  "Bangkok Utd",
  "Barcelona",
  "Barcelona B",
  "Barcelona SC",
  "Barnsley",
  "Barracas Central",
  "Basaksehir",
  "Basel",
  "Bayern",
  "Beira Mar",
  "Belgium",
  "Belgrano",
  "Benevento",
  "Benfica",
  "Benfica B",
  "Berço",
  "Beroe",
  "Besiktas",
  "Betis",
  "Birmingham",
  "Blackburn",
  "Blackpool",
  "Boavista",
  "Boca Juniors",
  "Bochum",
  "Bodo Glimt",
  "Bodrumspor",
  "Bogota",
  "Bolivar",
  "BOLIVIA",
  "Bologna",
  "Bolton",
  "Borac",
  "Bordeaux",
  "BOSNIA",
  "Botafogo",
  "Botafogo PB",
  "Botafogo SP",
  "Botev Plovdiv",
  "Bournemouth",
  "Braga",
  "Braga B",
  "Bragantino",
  "Brann",
  "Brannenburg",
  "BRAZIL",
  "Brentford",
  "Brescia",
  "Brest",
  "Brighton",
  "Bristol City",
  "Bristol Rovers",
  "Brondby",
  "Brusque",
  "Bucaramanga",
  "Budejovice",
  "BULGARIA",
  "Burgos",
  "BURKINA FASO",
  "Burnley",
  "Bursaspor",
  "Burton",
  "CABO VERDE",
  "Cadiz",
  "Cagliari",
  "Cambridge",
  "Cameroon",
  "CANADA",
  "Cardiff",
  "Carpi",
  "Cartagena SAD",
  "Cartagines",
  "Casa Pia",
  "Cascavel",
  "Castellon",
  "CD Everton",
  "CD Olimpia",
  "CD Vitoria",
  "Ceara",
  "Cejle",
  "Celje",
  "Celta",
  "Celtic",
  "Central Cordoba",
  "Cercle Brugge",
  "Cerro Porteno",
  "Chapecoense",
  "Charleroi",
  "Charlotte",
  "Charlton",
  "Chauvigny",
  "Chaves",
  "Chelsea",
  "Cheltenham",
  "Chesterfield",
  "Chicago Fire",
  "Chico",
  "CHILE",
  "Chivas Guadalajara",
  "Cincinnati",
  "Clermont",
  "Club A. Guemes",
  "Club America",
  "Club Brugge",
  "Club Leon",
  "Club Nacional",
  "Club Tijuana",
  "Cluj",
  "Cobresal",
  "Colo Colo",
  "COLOMBIA",
  "Colon",
  "Colorado Rapids",
  "Columbus",
  "Como",
  "COMORES",
  "Concordia",
  "Confianca",
  "Copiapo",
  "Corinthians",
  "Coritiba",
  "Cosenza",
  "COSTA DO MARFIM",
  "COSTA RICA",
  "Cova De Piedade",
  "Coventry",
  "Covilha",
  "CRB",
  "Cremonese",
  "Crewe",
  "Criciuma",
  "CROÁCIA U21",
  "CROATIA",
  "Crotone",
  "Cruz Azul",
  "Cruzeiro",
  "Crvena Zvezda",
  "Crystal Palace",
  "CSA",
  "CSKA Moscovo",
  "Cuiaba",
  "Czech Republic",
  "Dallas",
  "Damac",
  "Danubio",
  "Darmstadt",
  "DC United",
  "Defensa Y Justicia",
  "Defensores Belgrano",
  "Defensores Unidos",
  "Deinze",
  "Delfin",
  "Dender",
  "Denizlispor",
  "DENMARK",
  "Dep Cali",
  "Dep La Coruna",
  "Dep Pasto",
  "Deportes Tolima",
  "Desna",
  "Dietikon",
  "Dijon",
  "Din Minsk",
  "Din Zagreb",
  "Dinamo Tbilissi",
  "Djurgarden",
  "Dnipro",
  "Domzale",
  "Dortmund",
  "Dundalk",
  "Dusseldorf",
  "DVTK",
  "Dynamo Kyiv",
  "Dynamo Moscow",
  "ECUADOR",
  "EGIPTO",
  "Egnatia",
  "Eibar",
  "Eintracht Frankfurt",
  "El Gouna",
  "Elche",
  "Emelec",
  "Empoli",
  "ENGLAND",
  "Envigado",
  "Erzgebirge",
  "ESPANHA U21",
  "Espanyol",
  "ESTONIA",
  "Estoril",
  "Estrela",
  "Estudiantes",
  "Ethiopia Bunna",
  "ETIOPIA",
  "Eupen",
  "Everton",
  "Excursionistas",
  "Exeter",
  "Fabril Barreiro",
  "Famalicao",
  "Farense",
  "FC Copenhagen",
  "FCSB",
  "Feirense",
  "Felgueiras",
  "Fenerbahce",
  "Ferencvaros",
  "Feyenoord",
  "FINLAND",
  "Fiorentina",
  "Flamengo",
  "Floresta EC",
  "Fluminense",
  "Fortaleza",
  "Fortaleza (Col)",
  "Foz Do Iguacu",
  "FRANÇA U21",
  "France",
  "Freiburg",
  "Frosinone",
  "Fuenlabrada",
  "Fulham",
  "GABON",
  "Galatasaray",
  "Galway",
  "Gamba Osaka",
  "GAMBIA",
  "Gaz Metan",
  "Gaziantep",
  "Genk",
  "Genoa",
  "Gent",
  "GEORGIA",
  "GERMANY",
  "Getafe",
  "GHANA",
  "Giannina",
  "Gijon",
  "Gil Vicente",
  "Gimnasia L P",
  "Giresunspor",
  "Girona",
  "Gnistan",
  "Go Ahead Eagles",
  "Godoy Cruz",
  "Goias",
  "Goteborg",
  "Goztepe",
  "Granada",
  "Granada B",
  "Grasshoppers",
  "Green Buffaloes",
  "Gremio",
  "GRENADA",
  "Greuther Furth",
  "Groningen",
  "GUADELOUPE",
  "Guairena",
  "Guarani (Parag)",
  "Guimarães B",
  "GUINE BISSAU",
  "GUINE EQUATORIAL",
  "Guinea",
  "GV San Jose",
  "Hajduk Split",
  "Halmstads",
  "Hamburg",
  "Hamilton",
  "Hannover",
  "Hanoi FC",
  "Hansa Rostock",
  "Hapoel Beer Sheva",
  "Hapoel Tel Aviv",
  "Harrogate",
  "Hartberg",
  "Hatayspor",
  "Hatta (UAE)",
  "Hearts",
  "Heidenheim",
  "Heracles",
  "Herediano",
  "Hertha",
  "Hibernian",
  "HJK",
  "Hoffenheim",
  "Holstein Kiel",
  "HONDURAS",
  "Hong Ling (VIE)",
  "Houston",
  "Hradec Kralove",
  "Huachipato",
  "Huddersfield",
  "Huesca",
  "Huila",
  "HUNGARY",
  "Huracan",
  "Iberia 1999",
  "Ibiza",
  "ICELAND",
  "ILHAS FAROE",
  "Ind Medellin",
  "Ind. Rivadavia",
  "Independiente",
  "Independiente Del Valle",
  "Inglaterra U21",
  "Ingolstadt",
  "Instituto",
  "Inter",
  "Inter Miami",
  "Internacional",
  "Ionikos",
  "Ipswich",
  "IRAQ",
  "IRELAND",
  "IRLANDA DO NORTE",
  "Israel",
  "Istanbulspor",
  "ITALIA",
  "Ituano",
  "Jaguares De Cordoba",
  "JAPAN",
  "Jimma",
  "Juarez",
  "Junior",
  "Juventude",
  "Juventus",
  "Juventus-SP",
  "Kairat Almaty",
  "Karagumruk",
  "Karlsruher",
  "Karmitiossa",
  "Kashiwa Reysol",
  "Kasimpasa",
  "Kayserispor",
  "Kazakhstan",
  "Khor Fakkan ",
  "Kilmarnock",
  "Klaksvik",
  "Koln",
  "Kolos",
  "Konyaspor",
  "Kortrijk",
  "KOSOVO",
  "Krasnodar",
  "Krumovgrad",
  "KUPS",
  "KV Mechelen",
  "La Calzada",
  "La Equidad",
  "Lahti",
  "Lamia",
  "Lanus",
  "Larissa",
  "Las Palmas",
  "LASK LINZ",
  "LATVIA",
  "Lausanne",
  "Laval",
  "Lazio",
  "LDU Quito",
  "Leça",
  "Lecce",
  "Lech Poznan",
  "Lechia Gdansk",
  "Leeds",
  "Leganes",
  "Legia",
  "Leicester",
  "Leipzig",
  "Lens",
  "LENS SUB 21",
  "Leones",
  "Levadiakos",
  "Levante",
  "Lille",
  "Lillestrom",
  "Limon",
  "Lincoln Red Imps",
  "LINDA",
  "Liverpool",
  "Liverpool Montevideo",
  "LIVINGSTON",
  "Ljutomer",
  "Lommel",
  "Los Angeles FC",
  "Los Angeles Galaxy",
  "Lotte",
  "Ludogorets",
  "Lugo",
  "Luton",
  "Luxembourg",
  "Lyon",
  "Lyon-Duchère",
  "Macará",
  "Macedonia",
  "Machida Zelvia",
  "Madureira",
  "Mainz",
  "Malaga",
  "Malawi",
  "Malaysia",
  "Maldivas",
  "Malmo",
  "Malta",
  "Mamelodi Sundowns",
  "Manchester City",
  "Manchester United",
  "Mansfield",
  "Marseille",
  "Martigues",
  "Martyas",
  "Mauritania",
  "Mazatlan",
  "MC Alger",
  "Meizhou",
  "Melgar",
  "Melilla",
  "Melipilla",
  "Melrose",
  "Mexico",
  "Middlesbrough",
  "Millwall",
  "Minesota",
  "Minsk",
  "Mirandes",
  "Mjondalen",
  "Mladá",
  "Modena",
  "Molde",
  "Monaco",
  "Monarcas",
  "Monaro Panthers",
  "Monterrey",
  "Montpellier",
  "Montreal",
  "Moreirense",
  "Morocco",
  "MOTAGUA",
  "Motherwell",
  "Mottingham",
  "Moyale",
  "Mulhouse",
  "Mumbai City",
  "Musketeers",
  "Mutual",
  "Mykolaiv",
  "Nakhon Ratchasima",
  "Nancy",
  "Nantes",
  "Napoli",
  "Nashville",
  "Nassaji",
  "Nautico",
  "Nea Salamis",
  "Netherlands",
  "New York",
  "Newcastle",
  "Newell's Old Boys",
  "NICE",
  "Nigeria",
  "Nimes",
  "Niriz",
  "Norway",
  "Nottingham Forest",
  "Nurnberg",
  "OB Odense",
  "Oberneuland",
  "Oeste",
  "Olympiacos",
  "OMONIA",
  "Ontario Fury",
  "Orense",
  "Orlando City",
  "Orleans",
  "Orsha",
  "Osasuna",
  "Osijek",
  "Oskarshamn",
  "Ostende",
  "Osters",
  "Ostersund",
  "Oud-Heverlee Leuven",
  "Pachuca",
  "Pacific",
  "Padova",
  "Palermo",
  "Palestino",
  "Palmeiras",
  "Panaitolikos",
  "Panama",
  "Panathinaikos",
  "Pandaia",
  "Panionios",
  "Pardubice",
  "Paris FC",
  "Parma",
  "PAS Giannina",
  "Patriotas",
  "Pau",
  "Paxtakor",
  "Paysandu",
  "PEC Zwolle",
  "Penarol",
  "Pendikspor",
  "Perugia",
  "Persija Jakarta",
  "Persikabo 1973",
  "Perth Glory",
  "Pescara",
  "PFC Ludogorets",
  "PFC Slavia Sofia",
  "Pharco",
  "Philippines",
  "Phoenix Rising",
  "Pisa",
  "Pohang Steelers",
  "Poland",
  "Ponferradina",
  "Pordenone",
  "Portimonense",
  "Portland Timbers",
  "Porto",
  "Portsmouth",
  "Portugal",
  "Potenza",
  "Preussen Munster",
  "Progresso",
  "PSG",
  "Puebla",
  "Pueblito",
  "Punta Arenas",
  "Puskás Akadémia",
  "Qarabag",
  "Qatar",
  "Querétaro",
  "Queens Park Rangers",
  "Quilmes",
  "Radnik Bijeljina",
  "Raja Casablanca",
  "Raków Czestochowa",
  "Rapid Vienna",
  "Ratchaburi",
  "Rayo Vallecano",
  "RB Bragantino",
  "RB Leipzig",
  "Real Betis",
  "Real Madrid",
  "Real Oviedo",
  "Real Salt Lake",
  "Real Sociedad",
  "Red Bull Salzburg",
  "Red Star Belgrade",
  "Reggina",
  "Registan",
  "Remo",
  "Reus",
  "Reykjavik",
  "Ried",
  "Rijeka",
  "Rio Ave",
  "Rionegro Aguilas",
  "River Plate",
  "Rivers United",
  "Rizespor",
  "Rochdale",
  "Roma",
  "Romania",
  "Rosenborg",
  "Rosario Central",
  "Rostov",
  "Rotherham",
  "Royal Antwerp",
  "Rubin Kazan",
  "Rudar Prijedor",
  "Rudar Velenje",
  "Sabadell",
  "Sagan Tosu",
  "Salernitana",
  "Salford City",
  "Salzburg",
  "Sampdoria",
  "Samsunspor",
  "San Antonio",
  "San Lorenzo",
  "San Marcos",
  "San Martin Tucuman",
  "San Telmo",
  "Sanat Mes Kerman",
  "Sandhausen",
  "Santos",
  "Santos Laguna",
  "Sao Paulo",
  "Sarajevo",
  "Sarandi",
  "Sarmiento",
  "Sassuolo",
  "Saudi Arabia",
  "Sault Ste Marie",
  "Schalke",
  "Scotland",
  "Scunthorpe",
  "Seina",
  "Sekhukhune",
  "Senegal",
  "Septemvri Sofia",
  "Sepsi Sfantu Gheorghe",
  "Serbia",
  "Servette",
  "Sevilla",
  "Shabab Al Ahli",
  "Shabab Al-Ordon",
  "Shakhtar Donetsk",
  "Shandong Taishan",
  "Shanghai Port",
  "Sharjah",
  "Shenyang",
  "Shimizu S-Pulse",
  "Shkendija",
  "Shonan Bellmare",
  "Shrewsbury",
  "Sichuan Jiuniu",
  "Sigma Olomouc",
  "Silkeborg",
  "Simba SC",
  "Sint-Truiden",
  "Skenderbeu",
  "Slaven Belupo",
  "Slavia Mozyr",
  "Slavia Prague",
  "Slovakia",
  "Slovenia",
  "Slovan Bratislava",
  "Sochaux",
  "Sogndal",
  "Sonderjyske",
  "South Africa",
  "Southampton",
  "Spal",
  "Spain",
  "Spartak Moscow",
  "Spezia",
  "Sporting CP",
  "Sporting Cristal",
  "Sporting Kansas City",
  "Sportivo Luqueño",
  "Spurs",
  "St Johnstone",
  "St Louis City",
  "St Mirren",
  "St Patrick's Athletic",
  "St Polten",
  "Stade Brestois",
  "Stade Lavallois",
  "Standard Liege",
  "Stevenage",
  "Stjarnan",
  "Stoke City",
  "Strasbourg",
  "Stromsgodset",
  "Stuttgart",
  "Sudan",
  "Sunderland",
  "Suwon Samsung Bluewings",
  "Switzerland",
  "Sydney FC",
  "Syria",
  "Tacuary",
  "Taipei",
  "Talleres",
  "Tampico",
  "Tampines Rovers",
  "Tanzania",
  "Tarsus",
  "Tartu",
  "Tenerife",
  "Ternana",
  "Thailand",
  "The Strongest",
  "Thisted",
  "Tigres",
  "Tirana",
  "Tobol Kostanay",
  "Tokushima Vortis",
  "Toluca",
  "Torino",
  "Tottenham",
  "Trabzonspor",
  "Troyes",
  "Trujillanos",
  "Tucuman",
  "Tunisia",
  "Turkiye",
  "Tuzlaspor",
  "Tychy",
  "Ukraine",
  "UNAM Pumas",
  "Union Berlin",
  "Union de Santa Fe",
  "Union La Calera",
  "Universidad Catolica",
  "Universidad de Chile",
  "Universitario",
  "Universitario de Deportes",
  "Urawa Reds",
  "Uruguay",
  "Utrecht",
  "Uzbekistan",
  "Valencia",
  "Valenciennes",
  "Valerenga",
  "Valladolid",
  "Vancouver Whitecaps",
  "Venezuela",
  "Venezia",
  "Venezia FC",
  "Ventspils",
  "Vere United",
  "Veria",
  "Verona",
  "VfB Stuttgart",
  "Vfl Wolfsburg",
  "Viitorul",
  "Vietnam",
  "Viking FK",
  "Villarreal",
  "Vizela",
  "Vojvodina",
  "Volendam",
  "Volgar Astrakhan",
  "Waasland-Beveren",
  "Wakefield",
  "Walsall",
  "Wanderers",
  "Wang Topp",
  "Watford",
  "Wealdstone",
  "Wellington Phoenix",
  "West Bromwich Albion",
  "West Ham United",
  "Western Sydney Wanderers",
  "Whitecaps",
  "Wigan Athletic",
  "Wil",
  "Willem II",
  "Wolves",
  "Wrexham",
  "Xamax",
  "Yemen",
  "Yeovil Town",
  "Yokohama",
  "Young Boys",
  "Ypiranga FC",
  "Yverdon",
  "Zamalek",
  "Zamora FC",
  "Zenit St. Petersburg",
  "Zimbabwe",
  "Zrinjski Mostar",
  "Zurich",
  "Zwolle",
];
const generateDOB = () => {
  const start = new Date("1990-01-01");
  const end = new Date("2000-12-31");
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear all collections
    await Promise.all([
      Player.deleteMany({}),
      Country.deleteMany({}),
      NationalTeam.deleteMany({}),
      Club.deleteMany({}),
      Position.deleteMany({}),
      Match.deleteMany({})
    ]);

    // Create positions first and store them in a map for easy access
    const positionMap = new Map();
    const positionDocs = await Position.insertMany(
      positions.map(position => ({ position }))
    );
    positionDocs.forEach(doc => {
      positionMap.set(doc.position, doc._id);
    });

    // Create countries and store in map
    const countryMap = new Map();
    const countryDocs = await Country.insertMany(
      countries.map(country => ({
        country,
        status: "Active"
      }))
    );
    countryDocs.forEach(doc => {
      countryMap.set(doc.country, doc._id);
    });

    // Create clubs and store in map
    const clubMap = new Map();
    const clubDocs = await Club.insertMany(
      clubs.map(club => ({
        name: club,
        status: "Active"
      }))
    );
    clubDocs.forEach(doc => {
      clubMap.set(doc.name, doc._id);
    });

    // Create national teams with proper country references
    const nationalTeamMap = new Map();
    const nationalTeamData = [];
    
    nationalTeams.forEach(teamObj => {
      const country = Object.keys(teamObj)[0];
      const types = teamObj[country];
      types.forEach(type => {
        nationalTeamData.push({
          country,
          type,
          status: "Active"
        });
      });
    });

    const nationalTeamDocs = await NationalTeam.insertMany(nationalTeamData);
    nationalTeamDocs.forEach(doc => {
      const key = `${doc.country}-${doc.type}`;
      nationalTeamMap.set(key, doc._id);
    });

    // Helper function to get position ID based on index
    const getPositionId = (index) => {
      if (index === 0) return positionMap.get("Goalkeeper");
      if (index <= 4) return positionMap.get("Centre Back");
      if (index <= 8) return positionMap.get("Central Midfield");
      return positionMap.get("Center Forward");
    };

    // Helper function to get random national teams for a country
    const getRandomNationalTeams = (country) => {
      const teamTypes = ["A", "U-21", "U-19", "U-17"];
      const selectedTypes = teamTypes.slice(0, 1 + Math.floor(Math.random() * 2));
      return selectedTypes.map(type => ({
        name: country,
        type,
        from: new Date("2023-01-01"),
        to: null
      }));
    };

    // Create players for multiple clubs
    const playerData = [];
    const clubsToPopulate = clubDocs.slice(0, 5); // Take first 5 clubs for example

    clubsToPopulate.forEach((club, clubIndex) => {
      const countryForClub = countryDocs[clubIndex]; // Use different country for each club

      // Create 12 players for each club
      for (let i = 0; i < 12; i++) {
        const playerIndex = clubIndex * 12 + i;
        playerData.push({
          name: `${firstNames[playerIndex % firstNames.length]} ${lastNames[playerIndex % lastNames.length]}`,
          dateOfBirth: generateDOB(),
          position: getPositionId(i),
          currentClub: {
            club: club._id,
            from: new Date("2023-07-01")
          },
          country: countryForClub._id,
          nationalTeams: getRandomNationalTeams(countryForClub.country),
          previousClubs: [],
          ratingHistory: [{
            date: new Date("2023-07-01"),
            newRating: 3,
            type: 'manual',
            matchId: null
          }]
        });
      }
    });

    const savedPlayers = await Player.insertMany(playerData);

    // Log summary
    console.log('\nDatabase seeded successfully with:');
    console.log(`Countries: ${countryDocs.length}`);
    console.log(`Clubs: ${clubDocs.length}`);
    console.log(`Positions: ${positionDocs.length}`);
    console.log(`National Teams: ${nationalTeamDocs.length}`);
    console.log(`Players: ${savedPlayers.length}`);

    // Detailed player logging
    console.log("\nSample Player Details:");
    const playerDetails = await Player.find()
      .limit(5)
      .populate('currentClub.club')
      .populate('position')
      .populate('country');

    playerDetails.forEach(player => {
      console.log(`\nPlayer: ${player.name}`);
      console.log(`Club: ${player.currentClub.club.name}`);
      console.log(`Position: ${player.position.position}`);
      console.log(`Country: ${player.country.country}`);
      console.log('National Teams:', player.nationalTeams);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
