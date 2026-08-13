import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { FlatList } from '@/components/ui/flat-list';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ErrorState } from '@/src/components/ui/ErrorState';
import { LoadingState } from '@/src/components/ui/LoadingState';
import { TextField } from '@/src/components/ui/TextField';
import { useProducts } from '@/src/features/catalog/hooks';
import { StyledFeather } from '@/src/lib/styledIcons';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const productsQuery = useProducts({ search: submitted, page_size: 20 }, { enabled: !!submitted });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Box className="px-6 pt-2">
        <TextField
          label="Search"
          placeholder="Search products, brands, sellers"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => setSubmitted(query.trim())}
          returnKeyType="search"
          autoCapitalize="none"
        />
      </Box>

      {!submitted ? (
        <EmptyState title="Find something considered" message="Search by product, brand, or seller name." />
      ) : productsQuery.isPending ? (
        <LoadingState />
      ) : productsQuery.isError ? (
        <ErrorState onRetry={() => productsQuery.refetch()} />
      ) : productsQuery.data.results.length === 0 ? (
        <EmptyState title="No results" message={`Nothing matched "${submitted}" yet.`} />
      ) : (
        <FlatList
          data={productsQuery.data.results}
          keyExtractor={(item) => item.slug}
          contentContainerClassName="p-6 gap-3"
          renderItem={({ item }) => (
            <Box className="flex-row items-center py-3 min-h-11 border-b border-border/60">
              <Box className="flex-1">
                <Text bold className="text-foreground" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text size="xs" className="text-muted-foreground">
                  {item.seller.name}
                </Text>
              </Box>
              <Text bold className="text-foreground">
                KES {item.price_from}
              </Text>
              <StyledFeather name="chevron-right" size={18} className="text-muted-foreground ml-2" />
            </Box>
          )}
        />
      )}
    </SafeAreaView>
  );
}
