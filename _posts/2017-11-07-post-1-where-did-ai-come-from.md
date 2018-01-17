---
layout:   post
title:    "Post 1: Where Did AI Come From?"
date:     2017-11-07 12:00:00
author:   Phil Nadeau
excerpt:  "Artificial intelligence (“AI”) is the buzzword of 2017, but it didn't come from nothing. AI has been a feature of the Internet since it became a consumer phenomenon in the 90s, starting with search engines. In 2001, the spam epidemic brought us SpamAssassin, which brought the Bayesian machine learning algorithm to celebrity status."
---

# Post 1: A Brief History Of AI

Artificial intelligence (“AI”) is the buzzword of 2017, but it didn't come from nothing. AI has been a feature of the Internet since it became a consumer phenomenon in the 90s, starting with search engines. In 2001, the spam epidemic brought us SpamAssassin, which brought the Bayesian machine learning algorithm to celebrity status.

“Big Data” is the way that the Internet deals with vast seas of data distributed over many machines. Many AI techniques only become effective with millions of training examples, which in turn requires a lot of distributed computing power. So on the “supply side,” big data tools like Hadoop and TensorFlow enable practical AI. In a later post, we'll see that big data also drives the “demand side” of AI, because we now need machine learning to keep up with the new _Internet of Things_ data coming from mobile and embedded devices.

Let's and unpack some of these claims and new terminology.

### Artificial Intelligence Isn't Really A New Idea

The core idea of Artificial Intelligence has been with us since the invention of the modern computer. [_Alan Turing_](https://en.wikipedia.org/wiki/Alan_Turing) hypothesized his famous[ _Turing Test_](http://www.loebner.net/Prizef/TuringArticle.html) as part of a 1950 article in “Computing Machinery and Intelligence.” In this test, a human has a written dialog with two other participants, one a machine, one another human, and is asked to decide which is which. The machine passes the test if the human judge cannot distinguish between the two participants.

It’s not a very precise definition of AI, but the Turing Test is an interesting thought experiment and matches common intuition: “we know intelligence when we see it,” and if that intelligence comes from a machine, then that's AI.

A few years later, John McCarthy coined the term _Artificial Intelligence_ at a[ _1956 conference_](https://en.wikipedia.org/wiki/Dartmouth_workshop) at Dartmouth College:

> “[E]*very aspect of learning [can] be so precisely described that a machine can be made to simulate it. An attempt will be made to find how to make machines use language, form abstractions and concepts, ****solve kinds of problems now reserved for humans****, and improve themselves.*”

([_Dartmouth AI Project Proposal_](http://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html); J. McCarthy et al.; Aug. 31, 1955.)

Both Turing and McCarthy portray learning as a critical aspect of intelligence.[ _Machine Learning_](https://en.wikipedia.org/wiki/Machine_learning) (ML) is a subfield of AI, though they are often spoken of in the same breath. ML deals with programs that learn from experience without being explicitly programmed. We highlight the distinction in order to support our next claim:

### Search Engines Brought AI to the Average User

Before social media,[ _search engines_](https://en.wikipedia.org/wiki/Web_search_engine) were the killer app of the Internet. In those early days, we could enumerate the Internet's most popular resources in a single volume, like the[ _Whole Internet Catalog_](http://shop.oreilly.com/product/9781565920637.do). With the popularization of the World Wide Web, the Internet grew too vast, and changed too quickly, for any hand-curated index to keep pace. This growth motivated the creation of engines to[ _crawl_](https://en.wikipedia.org/wiki/Web_crawler) the seas of data and index it all for convenient search and retrieval. [Footnote](#footnote)

_Internet search_ is an AI problem hiding in plain sight. Only a person can distinguish relevant results from irrelevant results, and even that is highly subjective. Different people will make different judgements, and even the same person might make different decisions at different times. Search engines need to approximate these judgements, ideally as well as the average over many different users. Early indices were based on simple keyword searches, but the quality of these results was relatively low. Modern search engines use much more powerful techniques, ranging from[ _TF-IDF_](http://www.lucenetutorial.com/advanced-topics/scoring.html), used in[ _Lucene_](https://lucene.apache.org/),[ _SOLR_](http://lucene.apache.org/solr/), and[ _Elastic Search_](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html); to Google's famous[ _Pagerank_](https://en.wikipedia.org/wiki/PageRank), which added reference counts (among many other things) to improve relevancy.

### Spam Fighting Brought Machine Learning To The Average User

You may notice that search engines aren't (necessarily) learning systems. Turing and McCarthy both emphasize learning as part of AI, but the power of AI is also in speed and scale. Even early search engines could rank millions of pages, a task that would require an army of librarians. _Spam filtering_ is an example of a document classification problem, which is closely related to search. When the message arrives, the classifier decides if it is “spam” (discard it) or “ham” (keep it).

Spam filtering introduces a learning element in that it is trained from messages that the user previously labelled as spam. One of the first spam filters was[ _SpamAssassin_](https://wiki.apache.org/spamassassin/), based on a machine learning technique known as[ _Bayesian_](https://en.wikipedia.org/wiki/Bayesian_inference) inference. A simple statement of Bayes' Theorem looks like this:

> **P(A|B) = P(B|A) * P(A)/P(B)**

which can be read like this: “The probability of A being true (given that B is true) equals the probability that B is true (given that A is true) multiplied by the overall probability of A, divided by the overall probability of B.” Usually, “A” is a category (such as “Spam” or “Ham”); and B is an observation about the message, such as “We found the words 'Sildenafil' and 'Pharmacy' in the title” (likely spam), or “The sender is your boss” (arguably ham).

(Stephen Hawking, in writing “[_A Brief History of Time_](https://www.amazon.com/Brief-History-Time-Stephen-Hawking/dp/0553380168),” stated that he'd heard that every equation in a book halves its readership. I hope I didn't just lose half of mine.)

This equation may be the single most important mathematical statement in machine learning, because it showss that practical classifiers can be built by simply by counting _features_ in conjunction with _labels_. Features are observable properties of an entity, such as color, shape, or (in email) presence of particular words and phrases. Labels are the possible decisions we can make about those entities. The method generalizes to just about anything - we can look at the shape of mushrooms to decide if they are poisonous or edible; look for markers in network packets to detect denial-of-service attacks; and of course, look for words in email that signify spam.

### Looking Ahead: The Impact of AI, And The Consequences of Incorrect Answers

If you think spam is bad now, consider the early 2000s. Nine out of every ten messages were spam, and it was up to the individual user - not their email host - to block it. Reports of effectiveness vary ([_pro_](https://www.akadia.com/services/postfix_spamassassin.html) and[ _con_](https://www.spamstopshere.com/topics/spamassassin-comparison.html)) but even naive installations could stop 90% of spam.

The spam epidemic forced us to care about programs with [ _statistical error_](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors). Prior to the epidemic, most programs either worked, or failed because of programming errors (or _bugs_). To understand the distinction, consider our 90%-effective filter. Suppose I've received a hundred messages. Ten will be ham; ninety will be spam. If we stop 90% of the spam, we're still left with (.90 * 90) = 8 spam messages. Out of a total of 18 remaining messages, 8 will still be spam - 44%. That's still a lot of clutter. The failure isn't because of any bug in our program - that's just the best we can do given the combination of training data, algorithm, and whatever the spammers are doing on a given day.

If you're concerned about the social implications of AI, then consider what happens when a legitimate message is incorrectly labelled as spam. Naive filters might do that around 14% of the time. Statisticians call these “Type I Errors” or _False Positives_. Compare this mislabelling to the more obvious “Type II errors”, or _False Negatives_, which is like spam making it through the filter. False positives are often more problematic: for example, you can ignore irrelevant documents in searches, with at worst, some annoyance). In spam filtering, if a message is mistakenly flagged,[ _you might never see it at all_](https://www.bloomberg.com/news/articles/2017-10-20/pesky-spam-filter-is-behind-taser-maker-ghosting-the-sec).

A later post will go into the types of error that AI can experience, the reasons for those errors, and the consequences thereof. A few lost cat pictures and holiday cards might not mean much; but in critical situations, like _law enforcement_, _health care_, and _aviation security_, false positives can have grave consequences.

For now, just keep in mind that AI can fail in new ways, compared to other software, and there's no settled answer on who cleans up the mess.

### Big Data Enables AI and Machine Learning at Large Scales

From the examples of search and spam filtering, it should be clear that much of the benefit of AI is from scaling to keep up with inhuman levels of demand, and conserving scarce human attention for the problems that are most important. That leads us to our next claim: that big data enables the current AI wave.

The explosive growth of the web required a new type of distributed computing to keep pace. Previously, distributed computing had a heavy overlap with supercomputing, sometimes called high-performance computing (HPC). Traditional supercomputing programs are often precise simulations of physical phenomena, such as protein folding or the flight dynamics of aircraft. These are all problems requiring vast computational resources working on small sets of data. 

On the web, there’s large amounts of data split over thousands of computers. We call this phenomenon _Big Data_. Traditional supercomputing methods aren't effective on Big Data, because it's not efficient to collect or send all the data to a central algorithm. Further, the problems we're trying to solve are simpler, such as counting words of looking for hyperlinks. Google developed [_Map-Reduce_](https://en.wikipedia.org/wiki/MapReduce), which sends a small program to the data, and collects the (usually much smaller) results into a distributed storage system. Map-Reduce is very easy to distribute over the Internet, and has other benefits such as cheap fault tolerance.

The classic Map-Reduce problem is counting word frequencies in very large collections of documents - such as the World Wide Web. The first “map” step breaks the document up into a list of words; a “reduce” step rolls up the words into pairs of words and counts of how many times the word was seen in the document. Further “reduce” steps roll up the word counts over larger groups of documents. Eventually this yields the word counts for the entire collection, which can be used to build indices for search engines.

Counting words may not sound impressive, but recall what we said about Bayes' Theorem: it works for just about any situation where you can assign labels and count features, and those are no more complicated than words on a page. In fact, it turns out that Bayesian learning is only one of many machine learning algorithms that works well over Map-Reduce. Consequently, the advent of big data tools made machine learning a lot easier to scale. A lot of work has gone into making these tools more reliable and more accessible.

The most influential platform is [_Hadoop_](http://hadoop.apache.org/), from the Apache Foundation. Hadoop is known for providing [_Spark_](http://spark.apache.org/) (modernized map-reduce) and associated machine learning libraries, [_MLlib_](https://spark.apache.org/mllib/). A later post will discuss Hadoop and other tools in more detail, as well as the [_PredictionIO_](https://predictionio.incubator.apache.org/), which turns machine learning into a service.

### Good Old-Fashioned AI, Deep Learning, and Real-World Data

Techniques where we construct AI out of things like sets of rules, or statistical models, or decision trees, are called [_Good Old-Fashioned AI_](https://en.wikipedia.org/wiki/Symbolic_artificial_intelligence), or GOFAI. They depend on data that is relatively well-structured and well-behaved, or at least, not so badly behaved that it can't be cleaned up with statistical techniques like sampling or [_LaPlace smoothing_](https://en.wikipedia.org/wiki/Additive_smoothing). Things like Bayes and word-count work when the data is already labelled and in a more-or-less convenient form for the learning algorithm.

What do we mean by “convenient?” Well, database tables are about the most machine-convenient data imaginable. Each row in a table already has a clean and constrained set of features with names and defined types. It's easy to index a table and they're supported by programs with decades of engineering and commercial support behind them. Even complex queries can be optimized by classical statistics, such as analyzing the range of data and the co-occurence of values between columns.

Free-running text - like a page from a book - is less convenient in that it lacks structure, or clearly labelled attributes, or defined types. However, you can still split a page up into words, or look for significant phrases. You can even even extract data from common sentence structure. Consider building a geography database by looking through Wikipedia for sentences that look like “The capital of the state of --- is ---”. As programming tasks go, none of this is particularly hard, and mature toolkits exist to make it easier. A few open-source options are [_GATE_](https://en.wikipedia.org/wiki/General_Architecture_for_Text_Engineering), [_OpenNLP_](https://en.wikipedia.org/wiki/Apache_OpenNLP), and [_NLTK_](https://en.wikipedia.org/wiki/Natural_Language_Toolkit).

However, an increasing amount of data on the Internet is not convenient or well-behaved. Data storage is now so cheap that it's easy for everyone to store thousands of photos, hours of video, and hundreds of hours of sound. There's tremendous value in this real-world data, but the means to index it is not so obvious. Machine vision systems, like Amazon's [product finder](http://www.idownloadblog.com/2014/02/06/amazon-app-updated-with-flow/), can identify manufactured objects, especially if they cover art, or other clear labels. However, while a human may be able to identify wildflower species in photos, it's much harder for a machine to do the same thing.

[_Deep Learning_](https://en.wikipedia.org/wiki/Deep_learning) helps us index intractable data. Deep learning arranges many layers of simple machine learning elements in successive layers. The most common learning element is the artificial neural network, which are very powerful. However, neural networks require vast amounts of a very specific type of computing power. Further, like many machine learning problems, vision and voice problems require very large training sets to produce effective results, which increases the required computing power exponentially.

Part of the solution came from an unexpected source: computer gaming. It turns out that the operations required for efficient [3D rendering](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/) (long chains of multiplications with the sporadic addition) are also the same operations required for efficient neural net simulation. Then, in 2006, [a breakthrough in the training of neural nets](http://www.cs.toronto.edu/~hinton/) gave us ways to solve previously intractable problems in machine vision and natural language processing.

Since 2006, the industry has created a number of tools combining big data and HPC. One deep learning platform is [_Metamind_](https://einstein.ai/), founded in 2014 and acquired by Salesforce in 2016. Metamind is presently used to enable features of Salesforce Einstein, particularly those that depend on natural language processing and machine vision. Another deep learning platform is Google's [_Tensorflow_](https://www.tensorflow.org/). Google has built special processors called TPUs (Tensor Processing Units) to handle the compute demands of Deep Learning systems, but Tensorflow will also work on a desktop PC or virtual server.

### **Conclusion: AI Was Born On The Internet And It's Coming To the Real World**

We've presented a brief history of the major themes of AI on the consumer internet: search engines, the first programs to operate at 'web scale'; spam filters, the first applications to do machine learning for end-users; and big data, which made AI scalable almost without limit. Classic AI and machine learning can easily handle the kind of data found in web pages and database tables. Deep learning made it possible to solve previously-intractable problems like recognizing objects (like faces or trademarked symbols) in photographs or extracting words from recorded speech. With tools like Metamind and Tensorflow, deep learning is now becoming commoditized and increasingly available to small organizations and individual experimenters. While it still takes some technical skill to get started, there are new tools coming out all the time to make it easier to use AI.

We are at a unique juncture in history where the potential of the technology is wide open, but as an industry we're still working out how best to use it. Our next post will discuss this trend towards democratization, and how the same big data technology that enabled AI is also now demanding AI to keep up with the influx of real-world data. We'll also consider AI that grows beyond single use cases like “detect spam” or “predict sale price,” and foreshadow “Impact AI”, where AI decides (or at least advises on) the direction of institutions, and the implications this has for the public interest.

### Footnote

Internet search engines actually go back even further. Archie was built in 1990 to index FTP archives, a protocol for file exchange that predates the HTTP protocol of the World Wide Web by many years. Veronica (1992) and Jughead (1993) were search engines for Gopher, another protocol that similarly was eclipsed by the Web. The consumer Internet and the Web are more or less coincident, and we're not archaeologists, so we mention these older systems 3only to underscore our point: to the extent that search is AI, doing AI with the Internet is not a new idea.

