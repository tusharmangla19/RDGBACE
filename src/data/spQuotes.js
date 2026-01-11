const spQuotes = [
	{
		number: 1,
		quote: "Regulated life is the basic principle of spiritual advancement.",
		reference: "Srimad Bhagavatam 3.20.46, Purport",
	},
	{
		number: 2,
		quote:
			"Sadhana-bhakti means we have to practice... if you do not practice, how will you come to the perfectional stage?",
		reference: "Lecture, Los Angeles, July 13, 1972",
	},
	{
		number: 3,
		quote:
			"You must rise early, attend mangala arati, chant 16 rounds, read my books, and follow the regulative principles. This is sadhana-bhakti.",
		reference: "Letter to Bali-mardana, July 10, 1972",
	},
	{
		number: 4,
		quote:
			"Without sadhana, one cannot understand Krishna. Sadhana means strict practice under the guidance of a spiritual master.",
		reference: "Lecture on Bhagavad-gita 4.10, Montreal, August 25, 1968",
	},
	{
		number: 5,
		quote:
			"Chanting the Hare Krishna mantra is the beginning of spiritual life.",
		reference: "Srimad Bhagavatam 4.24.67, Purport",
	},
	{
		number: 6,
		quote:
			"This chanting of Hare Krishna is the easiest and most sublime process for self-realization in this age.",
		reference: "Introduction to Bhagavad-gita As It Is",
	},
	{
		number: 7,
		quote:
			"Chanting must be done with great attention. This inattentive chanting is the greatest offense.",
		reference: "Letter to Brahmananda, November 29, 1968",
	},
	{
		number: 8,
		quote:
			"Simply by chanting, one becomes purified and eligible to return home, back to Godhead.",
		reference: "Lecture on Srimad Bhagavatam 7.6.1, Montreal, June 21, 1968",
	},
	{
		number: 9,
		quote:
			"Chant sincerely, without offenses, and Krishna will reveal Himself to you.",
		reference: "Room Conversation, Melbourne, April 23, 1976",
	},
	{
		number: 10,
		quote:
			"One who chants the holy name offenselessly is immediately elevated to the spiritual platform.",
		reference: "Nectar of Instruction, Verse 5, Purport",
	},
	{
		number: 11,
		quote:
			"Hearing is the most important process of devotional service, because all other processes depend on hearing.",
		reference:
			"Lecture on Srimad Bhagavatam 1.2.17, Vrindavan, October 30, 1972",
	},
	{
		number: 12,
		quote:
			"The first step in Krishna consciousness is hearing. Without hearing, there is no question of chanting or remembering.",
		reference: "Letter to Karandhara, March 13, 1972",
	},
	{
		number: 13,
		quote:
			"If you hear Bhagavad-gita and Srimad Bhagavatam regularly and attentively, all misgivings in your heart will be cleansed.",
		reference: "Lecture on Srimad Bhagavatam 1.1.2, London, August 23, 1971",
	},
	{
		number: 14,
		quote:
			"Hearing is the beginning of spiritual life. By submissive hearing, the heart becomes purified.",
		reference: "Lecture on Srimad Bhagavatam 6.1.1, Dallas, July 1, 1975",
	},
	{
		number: 15,
		quote:
			"Hearing the lectures is not for entertainment but for purification and understanding the science of Krishna.",
		reference: "Letter to Gargamuni, May 25, 1969",
	},
	{
		number: 16,
		quote:
			"Sravanam is the process of hearing from the right source, the spiritual master. By hearing, one gradually develops love for Krishna.",
		reference: "Lecture on Bhagavad-gita 4.10, Montreal, August 25, 1968",
	},
	{
		number: 17,
		quote:
			"The early morning hours are especially meant for spiritual realization. The atmosphere is very peaceful and ideal for meditation.",
		reference: "Srimad Bhagavatam 3.20.46, Purport",
	},
	{
		number: 18,
		quote:
			"Brahma-muhurta is the most favorable time for spiritual practices. It is the best time to chant Hare Krishna and read scriptures.",
		reference: "Letter to Jadurani, February 4, 1972",
	},
	{
		number: 19,
		quote:
			"Rise early in the morning, chant your rounds, and perform devotional service. This is the way to conquer sleep and laziness.",
		reference: "Morning Walk, Bombay, January 4, 1977",
	},
	{
		number: 20,
		quote:
			"If you cannot rise early and attend mangala arati, then your spiritual life is finished.",
		reference: "Letter to Karandhara, July 22, 1972",
	},
	{
		number: 21,
		quote:
			"Rising early and performing sadhana during brahma-muhurta gives one spiritual strength throughout the day.",
		reference:
			"Lecture on Bhagavad-gita 6.16-24, Los Angeles, February 17, 1969",
	},
	{
		number: 22,
		quote:
			"Devotional service requires discipline. Without discipline, there is no spiritual life.",
		reference: "Srimad Bhagavatam 7.15.23, Purport",
	},
	{
		number: 23,
		quote:
			"The perfection of life is to follow the regulative principles of devotional service strictly and sincerely.",
		reference: "Letter to Jananivasa, December 28, 1972",
	},
	{
		number: 24,
		quote:
			"The essence of all sadhana is to chant Hare Krishna and engage in Krishna's service under the guidance of the spiritual master.",
		reference: "Lecture on Bhagavad-gita 7.1, Bombay, February 15, 1974",
	},
	{
		number: 25,
		quote:
			"We have to conquer the mind by practice. This is called sadhana-bhakti, regulated devotional service.",
		reference:
			"Lecture on Bhagavad-gita 6.5-12, Los Angeles, February 14, 1969",
	},
	{
		number: 26,
		quote:
			"Without strict adherence to sadhana, it is very difficult to make progress in Krishna consciousness.",
		reference: "Letter to Madhudvisa, April 26, 1970",
	},
];
function getQuote() {
	const randomQuote = Math.floor(Math.random() * spQuotes.length);
	return spQuotes[randomQuote];
}
const quote = getQuote();
export default quote.quote;
