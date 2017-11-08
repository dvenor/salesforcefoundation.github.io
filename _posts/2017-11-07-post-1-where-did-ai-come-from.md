---
layout:   post
title:    "Post 1: Where Did AI Come From?"
date:     2017-11-07 12:00:00
author:   Phil Nadeau
excerpt:  "Artificial intelligence (“AI”) is the buzzword of 2017, but it didn't come out of nowhere.AI has been a feature of the Internet since it became a consumer phenomenon in the 90s, starting with search engines. In 2001, the spam epidemic brought us SpamAssassin, which brought the Bayesian machine learning algorithm to celebrity status."
---
# Post 1: Where Did AI Come From?

Artificial intelligence (“AI”) is the buzzword of 2017, but it didn't come out of nowhere.AI has been a feature of the Internet since it became a consumer phenomenon in the 90s, starting with search engines. In 2001, the spam epidemic brought us SpamAssassin, which brought the Bayesian machine learning algorithm to celebrity status.

“Big Data” is the way that the Internet deals with large data sets split up over many machines. Many AI techniques only become effective with millions of training examples, which in turn requires a large number of computers to work. So on the “supply side,” big data tools like Hadoop and TensorFlow enable practical AI. In a later post, we'll see that big data also drives the “demand side” of AI, because we now need machine learning to keep up with mobile and embedded devices.

Let's and unpack some of these claims and new terminology.

### Artificial Intelligence Isn't Really A New Idea

Yes, really. The core idea of Artificial Intelligence has been with us since the invention of the modern computer. [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) hypothesized his famous [Turing Test](http://www.loebner.net/Prizef/TuringArticle.html) as part of a 1950 article in “Computing Machinery and Intelligence.” In this test, a human has a written dialog with two other participants, one a machine, one another human, and is asked to decide which is which. The machine passes the test if the human judge cannot distinguish between the two participants.

It’s not a great working definition of AI, but the Turing Test is an interesting thought experiment and matches common intuition: in other words, “we know intelligence when we see it,” and if that intelligence comes from a machine, then that's AI.

A few years later, John McCarthy coined the term “Artificial Intelligence” at a [1956 conference](https://en.wikipedia.org/wiki/Dartmouth_workshop) at Dartmouth College:

> “[E]_very aspect of learning [can] be so precisely described that a machine can be made to simulate it. An attempt will be made to find how to make machines use language, form abstractions and concepts,_ **_solve kinds of problems now reserved for humans_**_, and improve themselves._”

([Dartmouth AI Project Proposal](http://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html); J. McCarthy et al.; Aug. 31, 1955.)

Both Turing and McCarthy portray learning as a critical aspect of intelligence. [Machine Learning](https://en.wikipedia.org/wiki/Machine_learning) (ML) is a subfield of AI, though they are often spoken of in the same breath. ML deals with programs that learn from experience without being explicitly programmed. We highlight the distinction in order to support our next claim:

### Search Engines Brought AI to the Average User

Before social media, [search engines](https://en.wikipedia.org/wiki/Web_search_engine) were the killer app of the Internet. In those early days, we could enumerate the Internet's most popular resources in a single volume, like the [Whole Internet Catalog](http://shop.oreilly.com/product/9781565920637.do). With the popularization of the World Wide Web, the Internet grew too vast, and changed too quickly, for any hand-curated index to keep pace. This growth motivated the creation of engines to [crawl](https://en.wikipedia.org/wiki/Web_crawler) the vast oceans of data and index it all for easy searching.

Internet search is an AI problem hiding in plain sight. Only a person can distinguish relevant results from irrelevant results (and even that is going to vary over time and between people!) Search engines need to approximate this ability to decide relevance. In the early days, search engines estimated relevance based on the presence or absence of keywords in a result, and the quality of these results was relatively low. Modern search engines use much more powerful techniques, ranging from [TF-IDF](http://www.lucenetutorial.com/advanced-topics/scoring.html), used in [Lucene](https://lucene.apache.org/), [SOLR](http://lucene.apache.org/solr/), and [Elastic Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html); to Google's famous [Pagerank](https://en.wikipedia.org/wiki/PageRank), which added reference counts (among many other things) to improve relevancy.

### **Spam Fighting Brought Machine Learning To The Average User**

You may notice that search engines aren't (necessarily) learning systems, despite Turing and McCarthy both emphasizing learning as part of AI. The power of AI can also be in its speed and scale. Even early search engines could rank millions of pages, a task that would require an army of librarians working for multiple days.

Spam filtering is a problem related to search, in that it is also about deciding the relevance of messages. Spam filtering is an example of a document classification problem - when the message arrives, the classifier decides if it is “spam” (discard it) or “ham” (keep it). Spam filtering introduces a learning element in that it is trained from messages that the user previously labelled as spam.

One of the first spam filters was [SpamAssassin](https://wiki.apache.org/spamassassin/), based on a machine learning technique known as [Bayesian](https://en.wikipedia.org/wiki/Bayesian_inference) inference. A simple statement of Bayes' Theorem looks like this:

```
P(A|B) = P(B|A) * P(A)/P(B)
```

which can be read like this: “The probability of A being true (given that B is true) equals the probability that B is true (given that A is true) multiplied by the overall probability of A, divided by the overall probability of B.” Usually, “A” is a category (such as “Spam” or “Ham”); and B is an observation about the message, such as “We found the words 'Sildenafil' and 'Pharmacy' in the title” (likely spam), or “The sender is your boss” (arguably ham).

(Stephen Hawking, in writing “[A Brief History of Time](https://www.amazon.com/Brief-History-Time-Stephen-Hawking/dp/0553380168),” stated that he'd heard that every equation in a book halves its readership. I hope I didn't just lose half of mine.)

This equation may be the single most important mathematical statement in machine learning. The implication is that practical classifiers can be built by simply by counting how often features occur (or fail to occur) in conjunction with particular labels. The method generalizes to just about anything - we can look at the shape of mushrooms to decide if they are poisonous or edible; look for markers in network packets to detect denial-of-service attacks; and of course, look for words in email that signify spam.

### Looking Ahead: The Impact of AI, And The Consequences of Incorrect Answers

If you think spam is bad now, consider the early 2000s, before we had high quality spam filtering. Nine out of every ten messages were spam, and it was mostly up to the individual user - not their email host - to block it. Reports of effectiveness vary ([pro](https://www.akadia.com/services/postfix_spamassassin.html) and [con](https://www.spamstopshere.com/topics/spamassassin-comparison.html)) but even relatively naive installations could stop over 90% of spam.

SpamAssassin also forced us to care more about [statistical error](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors) -- another important concept in AI, especially for those of us concerned about the social impacts of AI. These are messages that are incorrectly labelled as spam, and naive installations might do that around 14% of the time. Statisticians call these “Type I Errors;” we also call them false positives. Compare this type of error to “Type II errors” or false negatives, which is like spam making it through the filter, or irrelevant documents getting mistakenly included in search results. False positives are often more problematic: for example, you can ignore irrelevant documents in searches, with at worst, some annoyance). In spam filtering, if a message is mistakenly flagged, [you might never see it at all](https://www.bloomberg.com/news/articles/2017-10-20/pesky-spam-filter-is-behind-taser-maker-ghosting-the-sec).

A later post will go into the types of error that AI can experience, the reasons for those errors, and the consequences thereof. A few lost cat pictures and holiday cards might not mean much; but in critical situations, like law enforcement, health care, and aviation security, false positives can have grave consequences. For now, just keep in mind that AI can fail in new ways, compared to other software, and there's no settled answer on who cleans up the mess.

From the example of search and spam filtering, it should be clear that AI isn't just about approaching human performance on particular tasks. A great deal of the benefit comes from scaling to keep up with inhuman levels of demand, and conserving scarce human attention for the problems that are most important. That leads us to our next claim: that big data enables the current AI wave.

### Big Data Enables AI and Machine Learning at Large Scales

The explosive growth of the web required a new type of distributed computing to keep pace. Previously, distributed computing had a heavy overlap with supercomputing, sometimes called high-performance computing (HPC). Supercomputing problems are usually precise physical simulations, such as simulating protein folding to aid in cancer research. These are all problems requiring vast computational resources working on small sets of data.

On the web, there’s large amounts of data split over thousands of computers, and we’re usually doing simple operations - such as counting keywords or looking for hyperlinks. Traditional HPC methods aren’t efficient for big data problems. Google developed a new type of computing, called Map-Reduce, to efficiently solve these “big data” problems. Instead of copying or streaming a huge amount of data through a central program, Map-Reduce sends the program to the data and collects the (usually much smaller) results.

The classic big data problem is counting word frequencies in very large collections of documents - such as the World Wide Web. The first “map” step breaks the document up into a list of words; a “reduce” step rolls up the words into pairs of words and counts of how many times the word was seen in the document. Further “reduce” steps roll up the word counts over larger groups of documents. Eventually this yields the word counts for the entire collection.

Counting words may not sound impressive, but recall what we said about Bayes' Theorem: it works for just about any situation where you can assign labels and count features, and those are no more complicated than words on a page. In fact, it turns out that Bayesian learning is only one of many machine learning algorithms that works over map-reduce. Consequently, the advent of big data made machine learning a lot easier to scale.

Since the invention of Map-Reduce, a lot of work has gone into making the tools more reliable and more accessible. The most influential platform is Hadoop, an open source system from the Apache Foundation. Hadoop is known for its Spark API (modernized map-reduce) and associated machine learning libraries (rather unimaginatively named MLlib.)

### Good Old-Fashioned AI, Deep Learning, and Real-World Data

Techniques where we construct AI out of things like sets of rules, or statistical models, or decision trees, are called “Good Old-Fashioned AI,” or GOFAI. They depend on data that is relatively well-structured and well-behaved, or at least, not so badly behaved that it can't be cleaned up with statistical techniques like sampling or LaPlace smoothing. Things like Bayes and word-count work when the data is already labelled and in a more-or-less convenient form for the learning algorithm.

What do we mean by “convenient?” Well, database tables are about the most machine-convenient data imaginable. Each row in a table already has a clean and constrained set of features with names and defined types. It's easy to index a table. Even complex queries can be optimized by pre-analyzing columns to see what values occur, and how often they occur in conjunction with data in other columns. These are classic problems in statistics and most modern database engines solve them very well.

Free-running text - like a page from a book - is less convenient in that it lacks structure, or clearly labelled attributes, or defined types. However, you can still split a page up into words or look for significant phrases. You can even look for statements of a particular form, such as “The capital of the state of ___ is ___”, and build databases from pairs of proper nouns (“New York” and “Albany”, “California” and “Sacramento”, and so on.) As programming tasks go, none of this is particularly hard, and there are mature tools to make it even easier.

However, an increasing amount of data on the Internet is not convenient or well-behaved. Data storage is now so cheap that it's easy for everyone to store thousands of photos, hours of video, and hundreds of hours of sound. There's tremendous value in this real-world data. (2)

“Deep learning” is intended to help us index this intractable data. Deep learning (according to Wikipedia) uses many layers of simple machine learning elements in succession. There's a lot of complicated arithmetic happening in parallel and feeding back to itself. The usual deep learning tools are neural networks, a powerful machine learning technique, but one that needs a lot of compute power to do well. Thus, deep learning requires a combination of both big data and high-performance computing to work. In 2006, a breakthrough in deep learning gave us ways to solve previously intractable problems in machine vision and natural language processing, and a number of tools combining big data and HPC have sprung up since.

One deep learning platform is Metamind, founded in 2014 and acquired by Salesforce in 2016\. Metamind is presently used to enable features of Salesforce Einstein, particularly those that depend on natural language processing and machine vision.

Another deep learning platform is Google's Tensorflow. Google has built special processors called TPUs (Tensor Processing Units) to handle the compute demands of Deep Learning systems, but Tensorflow will run just fine on a desktop PC or virtual server. It will even use NVIDIA graphics chips (GPUs) for additional computing power.

Tools like Metamind and Tensorflow are putting deep learning (and analysis of real data) increasingly in the hands of small organizations and individual experimenters. That leads to our next and final claim:

### Conclusion: AI Was Born On The Internet And It's Coming To the Real World

Our timeline shows the major themes of AI over the history of the consumer internet: search engines, the first programs to operate at 'web scale'; spam filters, the first applications to do machine learning for end-users; and big data, which made AI scalable almost without limit. Classic AI and machine learning can handle the kind of data found in web pages and database tables pretty easily. Deep learning made it possible to solve previously-intractable problems like recognizing objects (like faces or trademarked symbols) in photographs or extracting words from recorded speech.

The capabilities of AI are increasing while barriers to AI access are falling. Big data platforms are now thoroughly commoditized, and while it still takes some technical skill to get started, there are new tools coming out all the time to make it easier to use AI. We are at a unique juncture in history where the potential of the technology is wide open, but as an industry we're still working out how best to use it.

Our next post will discuss this trend towards democratization, and how the same big data technology that enabled AI is also now demanding AI to keep up with the influx of real-world data. We'll also consider AI that grows beyond single use cases like “detect spam” or “predict sale price,” and foreshadow “Impact AI”, where AI decides (or at least advises on) the direction of institutions, and the implications this has for the public interest.

### Footnote

(1) Internet search engines actually go back even further. Archie was built in 1990 to index FTP archives, a protocol for file exchange that predates the HTTP protocol of the World Wide Web by many years. Veronica (1992) and Jughead (1993) were search engines for Gopher, another protocol that similarly was eclipsed by the Web. The consumer Internet and the Web are more or less coincident, and we're not archaeologists, so we mention these older systems 3only to underscore our point: to the extent that search is AI, doing AI with the Internet is not a new idea.

(2) ... or at least, SOME of it is tremendously valuable. Unless someone knows how to predict market behavior from cat videos, I doubt that anyone will be making money off the contents of my mobile phone. But I digress.
