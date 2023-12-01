import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {

    }
  const params = useGlobalSearchParams();
  const router = useRouter();

  const { data, isLoading, error } = useFetch("job-details", {
    job_id: params.id,
  });
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen 
         options={{
            headerStyle: { backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn 
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
                />

            ),
            headerRight: () => (

                <ScreenHeaderBtn 
                iconUrl={icons.share}
                dimension="60%"
                handlePress={() => router.back()}
                />
            ),
            headerTitle: ""
        }} 
        />
        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ): error ? (
                    <Text>Something went wrong</Text>
                ): data.length === 0 ? (
                    <Text>No data</Text>
                ) : (
                    <View style={{ padding: SIZES.medium , paddingBottom: 100 }}>
                        <Company 
                        companyLogo = {data[0].employer_logo}
                        jobTitle = {data[0].job_title}
                        companyName = {data[0].emploer_name}
                        location = {data[0].job_country}
                        />
                        <JobTabs />
                    </View>
                )
                }
            </ScrollView>
        </>
    </SafeAreaView>
  );
};

export default JobDetails;