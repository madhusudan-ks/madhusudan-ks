// src/features/chatbot/tests/intentMatcher.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { matchQuestion, normalizeText } from '../services/intentMatcher.ts';

test('normalizeText normalizes casing, punctuation, and whitespace', () => {
  assert.equal(normalizeText('  Hello, World!  '), 'hello world');
  assert.equal(normalizeText('React.js / Node.js???'), 'react js nodejs');
  assert.equal(normalizeText(''), '');
});

test('Matches greetings accurately', () => {
  const result1 = matchQuestion('Hello');
  assert.equal(result1.intentId, 'greeting');
  assert.match(result1.response.text, /Hello! 👋/);

  const result2 = matchQuestion('Hey there!');
  assert.equal(result2.intentId, 'greeting');
});

test('Matches about and introduction questions', () => {
  const result = matchQuestion('Tell me about Madhusudan');
  assert.equal(result.intentId, 'about');
  assert.match(result.response.text, /Madhusudan K S/);
  assert.ok(result.response.links && result.response.links.length > 0);
});

test('Matches overall tech stack and skills', () => {
  const result = matchQuestion('What is your tech stack?');
  assert.equal(result.intentId, 'skills_all');
  assert.match(result.response.text, /Frontend/);
  assert.match(result.response.text, /Backend/);
});

test('Matches frontend-specific skills', () => {
  const result = matchQuestion('What are your React and TypeScript skills?');
  assert.equal(result.intentId, 'skills_frontend');
  assert.match(result.response.text, /Frontend Development Expertise/);
});

test('Matches backend-specific skills', () => {
  const result = matchQuestion('Tell me about your Java and Spring Boot experience');
  assert.equal(result.intentId, 'skills_backend');
  assert.match(result.response.text, /Backend & API Engineering/);
});

test('Matches database skills', () => {
  const result = matchQuestion('What SQL or PostgreSQL experience do you have?');
  assert.equal(result.intentId, 'skills_database');
  assert.match(result.response.text, /PostgreSQL/);
});

test('Matches projects list and specific projects', () => {
  const allProjects = matchQuestion('What projects have you built?');
  assert.equal(allProjects.intentId, 'projects_all');

  const physioex = matchQuestion('Tell me about the biomedical lab simulation tool');
  assert.equal(physioex.intentId, 'project_physioex');
  assert.match(physioex.response.text, /Biomedical/);

  const diet = matchQuestion('How does the diet analysis tracking app work?');
  assert.equal(diet.intentId, 'project_diet');
  assert.match(diet.response.text, /Diet/);

  const sso = matchQuestion('Explain your SSO CAS protocol authentication project');
  assert.equal(sso.intentId, 'project_sso');
  assert.match(sso.response.text, /Single Sign-On/);
});

test('Matches work experience and specific companies', () => {
  const allExp = matchQuestion('Where have you worked in your career?');
  assert.equal(allExp.intentId, 'experience_all');

  const excelsoft = matchQuestion('What was your role at Excelsoft Technologies?');
  assert.equal(excelsoft.intentId, 'experience_excelsoft');
  assert.match(excelsoft.response.text, /Excelsoft Technologies/);

  const audaz = matchQuestion('Tell me about your internship at Audaz Learning');
  assert.equal(audaz.intentId, 'experience_audaz');
  assert.match(audaz.response.text, /Audaz Learning/);
});

test('Matches contact and resume requests with working links', () => {
  const contact = matchQuestion('How can I contact or hire you?');
  assert.equal(contact.intentId, 'contact');
  assert.match(contact.response.text, /madhusudan\.ks\.work@gmail\.com/);
  assert.ok(contact.response.links?.some((l) => l.url.includes('mailto:')));

  const resume = matchQuestion('Can I get a copy of your resume or CV?');
  assert.equal(resume.intentId, 'resume');
});

test('Matches articles and blog publications', () => {
  const articles = matchQuestion('What technical articles or blog posts have you written?');
  assert.equal(articles.intentId, 'articles_stream');
  assert.match(articles.response.text, /System Architecture/);
});

test('Matches education questions', () => {
  const education = matchQuestion('What is your degree and educational background?');
  assert.equal(education.intentId, 'education');
  assert.match(education.response.text, /Computer Science/);
});

test('Returns helpful fallback for unknown / unrelated queries', () => {
  const unknown = matchQuestion('What is the capital of France and how to make pizza?');
  assert.equal(unknown.intentId, 'fallback');
  assert.match(unknown.response.text, /couldn't find a direct answer/);
  assert.ok(unknown.response.suggestions && unknown.response.suggestions.length > 0);
});

test('Handles empty and whitespace input safely', () => {
  const empty = matchQuestion('   ');
  assert.equal(empty.intentId, 'empty');
  assert.match(empty.response.text, /Please type a question/);
});

test('Handles excessively long inputs gracefully without throwing', () => {
  const longQuery = 'Tell me about your projects '.repeat(100);
  assert.doesNotThrow(() => {
    const res = matchQuestion(longQuery);
    assert.ok(res.response.text.length > 0);
  });
});
