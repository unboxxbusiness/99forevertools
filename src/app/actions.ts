
'use server';

import { z } from 'zod';
import { loremIpsum } from 'lorem-ipsum';
import { JSDOM } from 'jsdom';
import css from 'css';
import whois from 'freewhois';

export async function generateLoremIpsumAction(values: { paragraphs: number }) {
  try {
    const text = loremIpsum({
      count: values.paragraphs,
      units: 'paragraphs',
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
      sentenceLowerBound: 5,
      sentenceUpperBound: 15,
    });
    return { data: text };
  } catch (error) {
    return { error: 'Failed to generate Lorem Ipsum text.' };
  }
}

const passwordSchema = z.object({
    length: z.number(),
    includeUppercase: z.boolean(),
    includeNumbers: z.boolean(),
    includeSymbols: z.boolean(),
});

export async function generatePasswordAction(values: z.infer<typeof passwordSchema>) {
    try {
        const { length, includeUppercase, includeNumbers, includeSymbols } = values;
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let charSet = lowerCaseChars;
        if (includeUppercase) charSet += upperCaseChars;
        if (includeNumbers) charSet += numberChars;
        if (includeSymbols) charSet += symbolChars;

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            password += charSet[randomIndex];
        }
        return { data: password };
    } catch (error) {
        return { error: 'Failed to generate password.' };
    }
}

const termsSchema = z.object({
  companyName: z.string(),
  websiteName: z.string(),
  websiteUrl: z.string(),
  contactEmail: z.string(),
});

export async function generateTermsAndConditionsAction(values: z.infer<typeof termsSchema>) {
    try {
        const { companyName, websiteName, websiteUrl, contactEmail } = values;
        const text = `
Welcome to ${websiteName}!

These terms and conditions outline the rules and regulations for the use of ${companyName}'s Website, located at ${websiteUrl}.

By accessing this website we assume you accept these terms and conditions. Do not continue to use ${websiteName} if you do not agree to take all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.

Cookies
We employ the use of cookies. By accessing ${websiteName}, you agreed to use cookies in agreement with the ${companyName}'s Privacy Policy.

Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.

License
Unless otherwise stated, ${companyName} and/or its licensors own the intellectual property rights for all material on ${websiteName}. All intellectual property rights are reserved. You may access this from ${websiteName} for your own personal use subjected to restrictions set in these terms and conditions.

You must not:
- Republish material from ${websiteName}
- Sell, rent or sub-license material from ${websiteName}
- Reproduce, duplicate or copy material from ${websiteName}
- Redistribute content from ${websiteName}

This Agreement shall begin on the date hereof.

If you have any questions about these Terms, please contact us at ${contactEmail}.
`;
        return { data: text };
    } catch (error) {
        return { error: 'Failed to generate Terms and Conditions.' };
    }
}

const privacyPolicySchema = z.object({
  companyName: z.string(),
  websiteName: z.string(),
  websiteUrl: z.string(),
  contactEmail: z.string(),
});

export async function generatePrivacyPolicyAction(values: z.infer<typeof privacyPolicySchema>) {
    try {
        const { companyName, websiteName, websiteUrl, contactEmail } = values;
        const text = `
Privacy Policy for ${companyName}

At ${websiteName}, accessible from ${websiteUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${websiteName} and how we use it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at ${contactEmail}.

Log Files
${websiteName} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.

Cookies and Web Beacons
Like any other website, ${websiteName} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.

Our Advertising Partners
Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.

Privacy Policies
You may consult this list to find the Privacy Policy for each of the advertising partners of ${websiteName}.

Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${websiteName}, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.

Note that ${websiteName} has no access to or control over these cookies that are used by third-party advertisers.

Third Party Privacy Policies
${websiteName}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

Children's Information
Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

${websiteName} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.

Online Privacy Policy Only
This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ${websiteName}. This policy is not applicable to any information collected offline or via channels other than this website.

Consent
By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
`;
        return { data: text };
    } catch (error) {
        return { error: 'Failed to generate Privacy Policy.' };
    }
}

const schema = z.object({
  text: z.string(),
});

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) { return 1; }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 0;
}

export async function calculateReadabilityAction(values: z.infer<typeof schema>) {
    try {
        const { text } = values;
        const sentences = text.split(/[.!?]+/).filter(Boolean);
        const words = text.split(/\s+/).filter(Boolean);
        const wordCount = words.length;
        const sentenceCount = sentences.length;
        const syllableCount = words.map(countSyllables).reduce((a, b) => a + b, 0);

        if (wordCount === 0 || sentenceCount === 0) {
            return { data: { score: 0, wordCount: 0, sentenceCount: 0 } };
        }

        const score = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount);

        return { data: { score: Math.round(score), wordCount, sentenceCount } };
    } catch (error) {
        return { error: 'Failed to calculate readability score.' };
    }
}

const keywordDensitySchema = z.object({
    text: z.string(),
    keyword: z.string(),
});

export async function checkKeywordDensityAction(values: z.infer<typeof keywordDensitySchema>) {
    try {
        const { text, keyword } = values;
        const words = text.toLowerCase().split(/\s+/).filter(Boolean);
        const keywordWords = keyword.toLowerCase().split(/\s+/).filter(Boolean);
        
        const totalWords = words.length;
        if (totalWords === 0) {
            return { data: { density: 0, count: 0, totalWords: 0 }};
        }

        let count = 0;
        if (keywordWords.length === 1) {
            count = words.filter(word => word.includes(keywordWords[0])).length;
        } else {
            for (let i = 0; i <= words.length - keywordWords.length; i++) {
                const phrase = words.slice(i, i + keywordWords.length).join(' ');
                if (phrase === keyword.toLowerCase()) {
                    count++;
                }
            }
        }
        
        const density = (count / totalWords) * 100;

        return { data: { density: parseFloat(density.toFixed(2)), count, totalWords } };
    } catch (error) {
        return { error: 'Failed to check keyword density.' };
    }
}

const headlineSchema = z.object({
    headline: z.string(),
});

// Mock analysis, replace with a real sentiment/power word library if needed
const powerWordsList = ['amazing', 'secret', 'ultimate', 'guide', 'magic', 'powerful', 'proven', 'shocking', 'free', 'new', 'guaranteed'];
const positiveWordsList = ['happy', 'success', 'love', 'excellent', 'great', 'best'];
const negativeWordsList = ['sad', 'fail', 'bad', 'worst', 'terrible'];


export async function analyzeHeadlineAction(values: z.infer<typeof headlineSchema>) {
    try {
        const { headline } = values;
        const words = headline.toLowerCase().split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        // 1. Length Score
        let lengthScore = 0;
        if (wordCount >= 6 && wordCount <= 12) lengthScore = 100;
        else if (wordCount > 12) lengthScore = 100 - (wordCount - 12) * 5;
        else lengthScore = wordCount * 10;

        // 2. Sentiment Score
        const positiveWords = words.filter(word => positiveWordsList.includes(word)).length;
        const negativeWords = words.filter(word => negativeWordsList.includes(word)).length;
        let sentimentScore = 50;
        let sentimentType: 'Positive' | 'Negative' | 'Neutral' = 'Neutral';
        if (positiveWords > 0) {
            sentimentScore = Math.min(100, 50 + positiveWords * 20);
            sentimentType = 'Positive';
        }
        if (negativeWords > 0) {
            sentimentScore = Math.max(0, 50 - negativeWords * 10); // Negative sentiment is also powerful, but let's score it differently for this example
            if (positiveWords === 0) sentimentType = 'Negative';
        }

        // 3. Power Words Score
        const foundPowerWords = words.filter(word => powerWordsList.includes(word));
        const powerWordScore = Math.min(100, foundPowerWords.length * 25);
        
        // 4. Clarity Score (based on word length)
        const totalWordLength = words.reduce((acc, word) => acc + word.length, 0);
        const avgWordLength = totalWordLength / wordCount;
        const clarityScore = Math.max(0, 100 - (avgWordLength - 4) * 20);
        
        // Total Score
        const totalScore = Math.round((lengthScore * 0.4) + (sentimentScore * 0.2) + (powerWordScore * 0.25) + (clarityScore * 0.15));

        return { data: {
            totalScore: Math.max(0, Math.min(100, totalScore)),
            length: { score: Math.max(0, Math.min(100, Math.round(lengthScore))), count: wordCount },
            sentiment: { score: Math.max(0, Math.min(100, Math.round(sentimentScore))), type: sentimentType },
            powerWords: { score: Math.max(0, Math.min(100, Math.round(powerWordScore))), count: foundPowerWords.length, words: foundPowerWords },
            clarity: { score: Math.max(0, Math.min(100, Math.round(clarityScore))) },
        }};

    } catch (error) {
        return { error: 'Failed to analyze headline.' };
    }
}


const emailSubjectSchema = z.object({
  subject: z.string(),
});

const spamWords = ['free', 'win', 'winner', 'cash', 'prize', 'urgent', 'buy now', 'act now', '$$$', 'credit', 'loan', 'unsubscribe', 'click here'];
const urgencyWords = ['urgent', 'important', 'action required', 'final notice'];
const positiveWords = ['amazing', 'thank you', 'welcome', 'great news', 'invitation'];
const negativeWords = ['problem', 'issue', 'failed', 'declined', 'warning'];


export async function analyzeSubjectLineAction(values: z.infer<typeof emailSubjectSchema>) {
    try {
        const { subject } = values;
        const lowerSubject = subject.toLowerCase();

        // 1. Length analysis
        const charCount = subject.length;
        let lengthScore = 100;
        if (charCount < 20 || charCount > 60) {
            lengthScore = 50 - Math.abs(40 - charCount);
        }

        // 2. Spam word analysis
        const foundSpamWords = spamWords.filter(word => lowerSubject.includes(word));
        let spamScore = 100 - (foundSpamWords.length * 25);

        // 3. Emotion analysis
        const foundUrgency = urgencyWords.filter(word => lowerSubject.includes(word)).length;
        const foundPositive = positiveWords.filter(word => lowerSubject.includes(word)).length;
        const foundNegative = negativeWords.filter(word => lowerSubject.includes(word)).length;
        let emotionScore = 50 + (foundPositive * 20) + (foundUrgency * 15) - (foundNegative * 10);
        
        // 4. Formatting analysis
        const isAllCaps = subject === subject.toUpperCase() && subject.length > 5;
        const hasExcessivePunctuation = (subject.match(/[!?,.]{3,}/g) || []).length > 0;
        let formattingScore = 100;
        if (isAllCaps) formattingScore -= 50;
        if (hasExcessivePunctuation) formattingScore -= 50;

        // Calculate total score
        const totalScore = Math.round((lengthScore * 0.3) + (spamScore * 0.4) + (emotionScore * 0.15) + (formattingScore * 0.15));

        return { data: {
            totalScore: Math.max(0, Math.min(100, totalScore)),
            length: { score: Math.max(0, Math.min(100, Math.round(lengthScore))), count: charCount },
            spam: { score: Math.max(0, Math.min(100, Math.round(spamScore))), count: foundSpamWords.length, words: foundSpamWords },
            emotion: { score: Math.max(0, Math.min(100, Math.round(emotionScore))), positive: foundPositive, negative: foundNegative, urgency: foundUrgency },
            formatting: { score: Math.max(0, Math.min(100, Math.round(formattingScore))), isAllCaps, hasExcessivePunctuation },
        }};
    } catch (error) {
        return { error: 'Failed to analyze subject line.' };
    }
}

const emailPermutationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    domain: z.string(),
});

export async function generateEmailPermutationsAction(values: z.infer<typeof emailPermutationSchema>) {
    try {
        const { firstName, lastName, domain } = values;
        const fn = firstName.toLowerCase();
        const ln = lastName.toLowerCase();
        
        const permutations = [
            `${fn}@${domain}`,
            `${ln}@${domain}`,
            `${fn}${ln}@${domain}`,
            `${fn}.${ln}@${domain}`,
            `${fn.charAt(0)}${ln}@${domain}`,
            `${fn.charAt(0)}.${ln}@${domain}`,
            `${fn}${ln.charAt(0)}@${domain}`,
            `${fn}.${ln.charAt(0)}@${domain}`,
            `${ln}${fn.charAt(0)}@${domain}`,
            `${ln}.${fn.charAt(0)}@${domain}`,
        ];

        return { data: Array.from(new Set(permutations)) };
    } catch (error) {
        return { error: 'Failed to generate email permutations.' };
    }
}

const csvSchema = z.object({
  csvContent: z.string(),
});

// A simplified cleaning function. You'd likely use a more robust library for real-world scenarios.
const cleanRow = (row: { [key: string]: string }): { [key: string]: string } => {
  const cleaned: { [key: string]: string } = {};

  for (const key in row) {
    let value = row[key];
    const lowerKey = key.toLowerCase();

    // Trim whitespace
    value = value.trim();

    // Name standardization
    if (lowerKey.includes('name')) {
      value = value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    // Phone number standardization (basic example)
    if (lowerKey.includes('phone') || lowerKey.includes('mobile')) {
        value = value.replace(/[^0-9]/g, '');
        if (value.length === 10) {
           value = `+91-${value.slice(0, 5)}-${value.slice(5)}`;
        }
    }

    // Email standardization
    if (lowerKey.includes('email')) {
        value = value.toLowerCase();
    }

    cleaned[lowerKey] = value;
  }
  return cleaned;
};

// Extremely basic CSV parser
const parseCSV = (content: string): { headers: string[], rows: { [key: string]: string }[] } => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(',');
    const rowObject: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      rowObject[header] = values[index] ? values[index].trim() : '';
    });
    return rowObject;
  });
  return { headers, rows };
};


export async function cleanCsvAction(values: z.infer<typeof csvSchema>) {
    try {
        const { csvContent } = values;
        const { headers, rows } = parseCSV(csvContent);
        
        const cleanedRows = rows.map(cleanRow);

        const cleanedHeaders = Array.from(new Set(cleanedRows.flatMap(row => Object.keys(row))));

        return { data: { headers: cleanedHeaders, rows: cleanedRows }};
    } catch (error) {
        console.error(error);
        return { error: 'Failed to clean CSV data. Please check the file format.' };
    }
}

const domainSearchSchema = z.object({
  domain: z.string(),
});

export async function checkDomainAvailabilityAction(values: z.infer<typeof domainSearchSchema>) {
  try {
    const { domain } = values;
    if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
      return { error: 'Invalid domain format. Please enter a valid domain name (e.g., example.com).' };
    }

    const data = await whois(domain);
    
    // If data is returned, it means the domain is registered and thus unavailable.
    // The structure might vary, but any successful response means it's taken.
    return { data: { domain, isAvailable: false, message: `Domain "${domain}" is not available.` } };

  } catch (error: any) {
    // The `freewhois` library throws an error for available domains (e.g., 404 Not Found from RDAP).
    // We can interpret these specific errors as "available".
    if (error.message && (error.message.includes('404') || error.message.toLowerCase().includes('not found'))) {
        return { data: { domain: values.domain, isAvailable: true, message: `Congratulations! "${values.domain}" appears to be available.` } };
    }
    // Handle other errors, like invalid TLDs or network issues.
    if (error.message && error.message.includes('No RDAP server found')) {
        return { error: `The TLD ".${values.domain.split('.').pop()}" is not supported or invalid.` };
    }

    return { error: 'An unexpected error occurred during the domain check. Please try again.' };
  }
}
    


