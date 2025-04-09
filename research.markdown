---
layout: default
title: OpenCEM Research
---
<center><font size=20>OpenCEM Data and Simulator</font></center>






<center><font size=20>OpenCEM Algorithms</font></center>

<div style="border: 1px solid #ccc; padding: 1em; border-radius: 4px;">
**InstructMPC**

**InstructMPC** is a novel framework that enhances traditional Model Predictive Control (MPC) by integrating real-time human instructions through Large Language Models (LLMs). Its key innovation is a Language-to-Distribution (L2D) module, which translates contextual information—such as events, weather, and user-generated data—into predictive disturbance trajectories. These trajectories are then incorporated into the MPC optimization process.

Within **OpenCEM**, the abundance of real-world time series and diverse contextual data (e.g., local news, weather reports, event schedules) serve as valuable inputs for **InstructMPC**. By leveraging these inputs, **InstructMPC** can adapt its control strategy more effectively than traditional MPC methods, making it particularly powerful for energy management scenarios. The framework’s dynamic human-LLM interaction allows for real-time adjustments and refined decision-making, resulting in more responsive and context-aware control policies.

**Key Highlights:**

- **Context-Aware Control**: Incorporates local events, weather conditions, and user inputs into MPC for enhanced decision-making.
- **Closed-Loop Fine-Tuning**: Continuously refines its underlying prediction model using interactive feedback, leading to improved performance over time.
- **Theoretical Guarantees**: Achieves a regret bound of $O(\sqrt{T \log T})$ for linear dynamics with advanced fine-tuning approaches like Direct Preference Optimization (DPO).
- **Seamless Integration**: Suited for platforms like **OpenCEM**, which provide open datasets, real-time data streams, and a simulator for evaluating in-context learning algorithms.

As part of the **OpenCEM** initiative, **InstructMPC** will help demonstrate how in-context human instructions and local data can dramatically improve energy management decisions. Stay tuned for future updates and data releases that will further support and showcase **InstructMPC** in real-world settings.

R. Wu, J. Ai, and T. Li, [Instructmpc: A human-llm-in-the-loop framework for context-aware
control](https://arxiv.org/abs/2504.05946), 2025.

</div>
