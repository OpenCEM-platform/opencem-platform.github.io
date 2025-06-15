---
title: OpenCEM
subtitle: **Open** In-**C**ontext **E**nergy **M**anagement Platform
layout: default
permalink: /
page_id: index
lang: en
---

The Open In-Context Energy Management Platform (OpenCEM) at the 
Chinese University of Hongkong, Shenzhen aims to promote and enable
in-context learning for prediction and decision models in renewable
energy management through an open data set, simulator and public API.
The data set will be based on a local, in-campus PV installation and 
encourage user-generated context data. The installation is expected 
to start operation in Summer 2025 with first data publications planned 
for Fall 2025.


## **Context-Aware Energy Management**

Our project introduces a novel approach to optimizing energy systems by leveraging the reasoning ability of Large Language Models (LLMs) to interpret and act on real-world contextual information. This method allows for more adaptive and intelligent decision-making in dynamic environments.

At its core, the system operates as follows:

1.  **Contextual Input**: The process begins by feeding the system a "context description". This can be any relevant information about the current or anticipated state of the energy system, such as "a sunny afternoon with high energy demand" or "a cloudy morning with forecasted grid instability".

2.  **Scenario Probability Generation**: An LLM then processes this context to generate a set of possible future scenarios, each with an assigned probability. For example, a "sunny afternoon" context might lead to a high probability of abundant solar power generation.

3.  **Optimal Control Calculation**: The system then calculates the optimal charging or discharging strategy for the battery storage system based on a weighted average of all generated scenarios. This is achieved using a classical linear programming algorithm.

4.  **Performance Comparison**: To validate the effectiveness of this context-aware approach, we compare the cost-effectiveness of our method against the "perfect information" scenario, where the future is known. The more specific the initial context, the closer our model's performance is to the theoretical optimum. This demonstrates the value of providing detailed and accurate contextual information.

### **Why Contextual Decision-Making Matters**

In the real world, managing energy resources is a complex task. Traditional methods (such as MPC) often rely on rigid models that struggle to adapt to unforeseen events. Contextual decision-making offers two significant advantages:

* *Enhanced Predictions*: By incorporating a wide range of contextual data, our system can make more accurate predictions about future energy supply and demand. This leads to more efficient use of stored energy and reduced operational costs.
* *Seamless Adaptation*: The use of an LLM allows the system to be highly adaptable. It can easily incorporate new types of information or adjust to new scenarios without needing to be completely reprogrammed.

### **Our Vision: An Open-Source Ecosystem for Sustainable Energy**

Our ultimate ambition extends beyond this single application. We are committed to building a comprehensive, real-world environment for sustainable energy research and development.

We are developing an **open simulator API** that will allow researchers, developers, and hobbyists to test their own energy management algorithms in a realistic and accessible setting. This will foster innovation and collaboration in the field of sustainable energy.

Looking further ahead, we aim to construct a **"world model"** for critical energy infrastructure. This advanced simulation environment will serve as a digital twin of real-world energy systems, enabling the development of highly intelligent decision-making tools to ensure the stability and efficiency of our energy future.


Please find more details on the planned scope in our project 
[introduction](/introduction.html) and the [demo](/demo.html) for 
the processing of user-generated context.


<figure class="OpenCEM-overview-figure" style="max-width: 45%; margin: auto;">
  <img src="/assets/images/OpenCEM.en.svg" 
       alt="An overview of the OpenCEM platform, showing the interaction between the environment, agent, and monitoring tools." 
       class="OpenCEM-overview"
       style="width: 100%; height: auto; display: block;">
  <figcaption style="text-align: center; padding-top: 10px; font-style: italic;">
    Our open-source simulator in action, visualizing the real-time charging and discharging of a battery energy storage system. This tool allows researchers to test and validate their energy management algorithms in a realistic virtual environment.
  </figcaption>
</figure>
