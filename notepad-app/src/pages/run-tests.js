import { type } from 'os';
import { useState } from 'react';

export default function RunTests() {
  const [results, setResults] = useState([]);

  const runTests = async () => {
    const testModules = [
      () => import('../tests/env.test.js'), 
      () => import('../tests/supabaseClient.test.js'),
      () => import('../tests/dbConnection.test.js'),
      () => import('../tests/pageRender.test.js'),
    ];

    const testResults = [];

    for (const loadTestModule of testModules) {
      try {
        const testModule = await loadTestModule();
        console.log('Loaded test module:', testModule);
        console.log(typeof testModule.default);
        if (testModule && typeof testModule.default === 'function') {
          await testModule.default(); // Assuming each test module exports a default async function
          testResults.push({ success: true, message: 'Test passed' });
        } else {
          testResults.push({ success: false, message: 'Invalid test module' });
        }
      } catch (error) {
        testResults.push({ success: false, message: error.message });
      }
    }

    setResults(testResults);
  };

  return (
    <div>
      <h1>Run Tests</h1>
      <button onClick={runTests}>Run All Tests</button>
      <ul>
        {results.map((result, index) => (
          <li key={index} style={{ color: result.success ? 'green' : 'red' }}>
            {result.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
