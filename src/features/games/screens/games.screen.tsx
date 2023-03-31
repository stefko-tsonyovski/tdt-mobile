import React, { FC, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { BracketGameCard } from "../components/bracket-game-card/bracket-game-card.component";
import { Dashboard } from "../components/dashboard/dashboard.component";
import { FantasyGameCard } from "../components/fantasy-game-card/fantasy-game-card.component";
import CountryFlag from "react-native-country-flag";
import {
  GamesContainer,
  PredictBracketContainer,
} from "../components/games.styles";
import { PredictGameCard } from "../components/predict-game-card/predict-game-card.component";
import { Modal, Portal, Button, Switch } from "react-native-paper";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GamesRootStackParamList } from "../../../infrastructure/navigation/games.navigator";
import { colors } from "../../../infrastructure/theme/colors";
import { Banner } from "../../../components/banner/banner.component";

export type GamesScreenProps = NativeStackScreenProps<
  GamesRootStackParamList,
  "GamesMain"
>;

export const GamesScreen: FC<GamesScreenProps> = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    maxHeight: 400,
  };

  return (
    <SafeArea>
      <GamesContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Banner />

          <FantasyGameCard navigation={navigation} route={route} />
          <Spacer position="top" size="large">
            <PredictBracketContainer>
              <PredictGameCard navigation={navigation} route={route} />
              <Spacer position="left" size="large">
                <BracketGameCard navigation={navigation} route={route} />
              </Spacer>
            </PredictBracketContainer>
          </Spacer>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
              style={{ padding: 20 }}
            >
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {isSwitchOn ? (
                    <CountryFlag isoCode="BG" size={25} />
                  ) : (
                    <CountryFlag isoCode="GB" size={25} />
                  )}
                  <Spacer position="left" size="medium">
                    <Text variant="body">{isSwitchOn ? "BG" : "GB"}</Text>
                  </Spacer>
                  <Switch
                    style={{ alignItems: "center" }}
                    color={colors.bg.secondary}
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                  />
                </View>
                <Text variant="body">
                  {isSwitchOn
                    ? `Добре дошли в TennisDreamTeam! Ако искате да тествате знанията си по тенис, да се състезавате с други, да участвате в лиги или просто да се забавлявате, вие сте на правилното място! Ние предлагаме три различни типа игри, които накрая се използват за изчисляване на общите ви точки. Игрите са:`
                    : `Welcome to TennisDreamTeam! If you want to test your tennis knowledge, compete with others, participate in leagues or just to have fun, you are at the right place! We offer three different types of games which at the end are used to calculate your total points. The games are:`}
                </Text>
                <Text variant="body"> - Tennis Fantasy Game</Text>
                <Text variant="body"> - Bracket</Text>
                <Text variant="body"> - Predict</Text>
                <Text variant="body">
                  {isSwitchOn
                    ? `Правилата не са трудни за разбиране за хора с опит в подобен тип игри, но нашата цел също е да достигнем до хора, които или се интересуват от тенис, но не са запознати с подобни игри, или изобщо са нови в тениса. Така че нека се потопим директно в правилата! Първо, нека дадем обща информация за елементите в приложението, които ще виждате често. Ще идентифицирате менюто с три бутона. Това меню не е специфично за дадена игра, то е просто навигация към лиги, класации и покани. Лигите са начин да спечелите допълнителни точки, така че не ги пренебрегвайте! Или създайте своя собствена, или се присъединете към съществуваща лига, защото в края на сезона, в зависимост от това колко добра е вашата лига и как сте допринесли за нея, ще получите допълнителни точки. А сега да преминем към правилата!`
                    : `The rules are not hard to comprehend for people with experience in fantasy games, but our goal is also to reach out people who are either interested in tennis, but are not familiar with such games, or are new in tennis at all. So let's directly dive into the rules! First, let's give some general information about elements on the app you will see frequently. You will identify menu with three buttons. That menu is not specific to given game, it's just navigation to leagues, rankings and invitations. Leagues are way to earn some extra points, so don't neglect them! Either create your own or join an existing league because at the end of the season depending on how good your league is and how you contributed to the league, you will receive extra points. Now, let's move onto the rules!`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? `1. Tennis Dream Team - Това е може би най-трудната игра от трите. Но не се страхувайте! Това е така, защото трябва да можете да идентифицирате голямата картина в турнирите, така че да можете да изградите най-добрия си отбор. За да започнете, щракнете върху бутона "PLAY" под снимката с надпис "Tennis Dream Team". Ще видите вашите точки за избраната седмица от вашия отбор (по подразбиране това е първата седмица, можете да го промените от падащото меню със седмиците), общия брой точки от вашия отбор досега, оставащите пари, които имате за избраната седмица и също колко смени имате. Вашата цел е да избирате отбор всяка седмица (в перфектния вариант 8 основни играча + 4 резерви, които можете да включите в играта по всяко време) за 80 милиона, които ще ви печелят точки въз основа на статистиката на мачовете, в които участват вашите играчи. Ще видите системата за точкуване в края на секцията. Имайте предвид, че броят смени не се нулира всяка седмица, те са за целия сезон, така че имайте това предвид! И така, има няколко начина за добавяне на играчи: можете или да щракнете върху "+" върху някои от празните карти или да щракнете върху "VIEW ALL PLAYERS" и след това да щракнете върху "+" до играчите. Ако вече сте купили този играч, ще видите "-" до тях. Можете да извършвате смени само ако сте попълнили отбора си с 8 играчи, така че когато имате 8 играчи в отбора си за избраната седмица, играчите, закупени след тях, ще бъдат автоматично добавени към вашите резерви. Можете да видите вашите резерви, като кликнете върху "VIEW ALL SUBSTITUTIONS". Можете да извършите смяна, като щракнете върху "+" до играча, който искате да включите в основния отбор. Ще бъдете подканени да изберете играч от вашия отбор, който искате да поставите на пейката. Не се притеснявайте - точките и топките на стария играч ще бъдат прехвърлени на новия играч. Но внимавай! Както бе споменато по-горе, имате само ограничени смени на сезон. Когато извършите смяна, общите ви сделки ще бъдат намалени с 1. Сега вече трябва да се питате „Каква е целта на тези топки?“. Е, можете да ги използвате, за да умножите точките на играч по ваш избор! По подразбиране всеки играч, добавен към вашия отбор, получава 1 топка. Имате 10 топки всяка седмица, които можете да разделите между играчи по ваш избор. Можете да добавите топка към играч, като щракнете върху по-светлата икона на тенис топка и да премахнете топка от играч, като щракнете върху по-тъмната. С това покрихме основите на първата игра! Само още нещо. Има два бутона: „UPDATE WEEKLY“ и „UPDATE TOTAL“. Тези бутони са много важни, тъй като ще ги използвате, за да актуализирате седмичните си точки и съответно общите си точки. Така че първо ще актуализирате седмичните си точки и след това общите си точки. Обърнете внимание, че ще получите съобщение за грешка, ако се опитате да актуализирате точки за седмица, която е предстояща или отминала. За ваше улеснение ще видите текущата седмица и ако избраната от вас седмица е изтекла ще видите съобщение "DEADLINE PASSED!", в противен случай трябва да видите колко дни, часове и минути остават до избраната седмица. Системата за оценяване е както следва:`
                    : `1. Tennis Dream Team - This is probably the hardest game of all three. But don't be scared! It's because you should be able to identify the big picture in tournaments, so that you can setup your best squad possible. To start with, click the "PLAY" button below the picture labeled "Tennis fantasy game". You will see your points for the selected week from your team (by default it is first week, you can change it from the weeks dropdown), total points from your team so far, the remaining balance you have for the selected week and also how many trades you have. Your goal is to build team each week (perfectly 8 main players + 4 substitutions who you can bring into the game at any time) for 80M which will earn points for you based on stats of matches your players are involved into. You will see the scoring system at the end of the article. Note that the trades are not reset each week, they are for the whole season, so keep that in mind! So, they are several ways to add players: you can either click on the "+" on some of the empty cards or click "VIEW ALL PLAYERS" and then click on the "+" next to the players. If you have already bought this player, you will see "-" next to them. You can perform substitutions only if you filled your squad with 8 players, so when you have 8 players into your team for the selected week, players purchased after them will be automatically added into your subs. You can see your reserves by clicking on "VIEW SUBSTITUTIONS". You can perform substitution by clicking on the "+" next to the player you want to bring into the game. You will be prompted to select player from your team you want to bench. Don't worry - the points and balls of the old player will be transferred to the new player. But be careful! As mentioned above, you only have limited trades by season. When you perform a substitution, your total trades will be deducted by 1. Now you should be already asking yourself "What is the purpose of these balls?". Well, you can use them to multiply the points of player of your choice! By default, each player that is added into your team receives 1 ball. You have 10 balls each week which you can divide between players of your choice. You can add a ball to a player by clicking on the lighter tennis ball icon and remove a ball from a player by clicking on the darker one. With that we covered the basics of the first game! Just one thing to mention. There are two buttons: "UPDATE WEEKLY" and "UPDATE TOTAL". These buttons are very important since you will use them to update your weekly points and respectively your total points. So first you will update your weekly points and then your total ones. Note that you will receive error message if you try to update points for week that is either upcoming or passed. For your convenience, you will see the current week and if the selected by you week is passed you will see message "DEADLINE PASSED!", otherwise you should see how many days, hours and minutes are left to the selected week. The scoring system is as it follows:`}
                </Text>
                <Text variant="body">
                  {isSwitchOn ? ` - Ас: +0.25 точки` : ` - Ace: +0.25 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? ` - Двойна Грешка: -0.25 точки`
                    : ` - Double Fault: -0.25 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? ` - Печеливш Удар: +0.1 точки`
                    : ` - Winner: +0.1 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? ` - Непредизвикана Грешка: -0.1 точки`
                    : ` - Unforced Error: -0.1 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? ` - Спечелен гейм: 1 точка`
                    : ` - Game won: 1 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? ` - Спечелен сет: 2 точки`
                    : ` - Set won: 2 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? ` - Спечелен мач: 5 точки`
                    : ` - Match won: 5 points`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? `2. Bracket - Това е следващата ни игра! Наистина е лесно да се играе и ще постави на изпитание знанията ви по тенис! Когато я отворите, ще видите вече познати неща като менюто и точките. Вашата цел е да се опитате да познаете победителя от предоставените мачове за турнирите от избраната седмица. Можете да навигирате между различните турнири, като използвате иконата със стрелка. За всеки турнир можете да щракнете върху бутоните, обозначени с различни кръгове (1/64 финали, 1/32 финали, 1/16 финали, 1/8 финали, 1/4 финали, 1/2 финали и финал) и ще видите мачовете за избрания кръг. За да направите предположение, просто трябва да щракнете върху иконата на кръг до играча, който смятате, че ще премине към следващия кръг. Но внимавай! Всеки мач има начална дата и ако го пропуснете, ще бъдете посрещнати със съобщението "DEADLINE PASSED!"! Можете да проверите мачовете предварително, като щракнете върху иконата за тенис от долната навигация. И трябва да правите предположения, докато стигнете до края на избрания кръг. Можете да навигирате между различните мачове със стрелките. И за да разберете дали получавате точки за този мач или не, трябва да кликнете върху иконата за потвърждение до мача. Ако все още няма резултат, ще получите съобщение за грешка. В края на процеса трябва отново да кликнете върху бутона „UPDATE TOTAL“, за да напреднете в класацията. Как работи точкуването тук? Използваме броя на гласовете, които са събрали играчите за даден мач. Ако например играят Медведев и Джокович и гласувате за Медведев и той спечели, печелите толкова точки, колкото гласове има Джокович (може да видите кой колко гласове има като натиснете върху сивия правоъгълник).`
                    : `2. Bracket - This is our next game! It's really easy to play and it will put your tennis knowledge to the test! When you open it, you will see already familiar things such as the menu and the points. Your goal is to try to guess the winner of the provided matches for the tournaments of the selected week. You can navigate between the different tournaments using the arrow icon. For every tournament you can click on the buttons labeled with different stages (1/64 finals, 1/32 finals, 1/16 finals, 1/8 finals, 1/4 finals, 1/2 finals and final) and you will see the matches for the selected round. In order to make a guess, you just need to click on the circle icon next to the player you think will advance to the next round. But be careful! Each match has a starting date and if you miss it, you will be greeted with "Deadline passed!" message! You can check matches in advance by clicking on the tennis icon from the bottom navigation. And you have to do guess matches until you reach the end for the selected round. You can navigate between matches with the arrows. And to understand whether you receive points for this match or not, you have to click on the verify icon next to the match. If result is not present yet, you will receive an error message. At the end of the process you have to click on the "UPDATE TOTAL BRACKET POINTS" button again, so that you progress into the rankings. How does scoring work here? We use the number of votes players have collected for a given match. For example, if Medvedev and Djokovic are playing and you vote for Medvedev and he wins, you get as many points as Djokovic has votes (you can see who has how many votes by clicking on the gray rectangle)`}
                </Text>
                <Text variant="body">
                  {isSwitchOn
                    ? `Predict - Третата и последна игра в нашето приложение. Тук започвате с бюджет от 100 точки за прогнозиране. Целта е да гласувате за прогнози, създадени от други потребители и да ги маркирате като правилни или грешни. Всеки глас струва 3 точки, а ако познаете, ще получите 6 точки. Можете също да спечелите точки, като създадете свои собствени прогнози. Отново струва 3 точки и ако прогнозата ви е вярна, ще получите 6 точки. Но внимавайте със съдържанието на вашата прогноза, защото тя първо ще бъде одобрена от администратор!`
                    : `3. Predict - The third and final game in our app. Here you start with budget of 100 prediction points. The goal is to vote for predictions created by other users and mark them as correct or wrong. Each vote costs 3 points and if you guess, you will get 6 points. You can also win points by creating your own predictions. Again, it costs 3 points and if your prediction is correct, you will 6 points. But be careful about the content of your prediction because it will be approved by an admin first!`}
                </Text>
              </ScrollView>
              <Button
                color={colors.bg.secondary}
                style={{ alignItems: "flex-end" }}
                onPress={hideModal}
              >
                Close
              </Button>
            </Modal>
          </Portal>
          <Button
            mode="contained"
            color={colors.bg.primary}
            onPress={showModal}
          >
            Rules
          </Button>
          <Spacer position="top" size="large">
            <Dashboard />
          </Spacer>
        </ScrollView>
      </GamesContainer>
    </SafeArea>
  );
};
