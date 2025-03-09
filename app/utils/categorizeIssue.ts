import { Issue, LabelCategory } from "@/app/types";
import { labelMapping } from "@/app/data/label-mapping";

export function categorizeIssue(issue: Issue): LabelCategory[] {
  const categories = new Set<LabelCategory>();

  // Convert issue labels to lowercase for case-insensitive matching
  const issueLabels = issue.labels.map((label) => label.name.toLowerCase());

  // Check each label against our mapping
  for (const [category, mappedLabels] of Object.entries(labelMapping)) {
    const hasMatchingLabel = issueLabels.some((issueLabel) =>
      mappedLabels.some(
        (mappedLabel) =>
          issueLabel.includes(mappedLabel.toLowerCase()) ||
          mappedLabel.toLowerCase().includes(issueLabel),
      ),
    );

    if (hasMatchingLabel) {
      categories.add(category as LabelCategory);
    }
  }

  // If no categories matched, add to 'other'
  if (categories.size === 0) {
    categories.add("other");
  }

  return Array.from(categories);
}
