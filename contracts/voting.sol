// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
contract FakeNews{

    struct News{
        address payable newsAgency;
        uint date;
        string Title;
        string Article;
        address payable[]  Upvote;
        address payable[]  Downvote;
        uint status;
        uint deadline;

     }

     uint votingPeriod=150;

    mapping(uint=>News) public newslist;
    uint public nextId;
    mapping(address=>mapping(uint=>int)) public vote;

    uint public nextNewsEvaluate;

    function addNews(address payable  AgencyName,string memory _title,string memory  _Article) public payable {
        require(msg.sender.balance>0.01 ether,"You dont have enough money(need 0.01 ether)");
        require(msg.value==0.01 ether,"Please pay 0.01 ether only");//
        newslist[nextId].newsAgency=AgencyName;
        newslist[nextId].Title=_title;
        newslist[nextId].Article=_Article;
        newslist[nextId].date=block.timestamp;
        newslist[nextId].status=0;
        newslist[nextId].deadline=newslist[nextId].date+votingPeriod;
        nextId++;

    }
    function getNews(uint id) public view  returns (address,uint,string memory ,string memory,uint,uint,uint){
        return (newslist[id].newsAgency,newslist[id].date,newslist[id].Title,newslist[id].Article,newslist[id].Upvote.length,newslist[id].Downvote.length,newslist[id].status);


    }
    function UpVote(uint id) public payable{
        require(newslist[id].deadline>block.timestamp,"The deadline has passed");
        require(vote[msg.sender][id]==0,"You have already voted");
        require(msg.sender.balance>0.01 ether,"You dont have enough money");
        require(newslist[id].status==0,"News already evaluated");
        require(msg.value==0.01 ether,"Please pay 0.01 ether only");
        require(msg.sender!=newslist[id].newsAgency,"The news publisher cannot vote");
        vote[msg.sender][id]=1;
        newslist[id].Upvote.push(payable(msg.sender));

    }
    function DownVote(uint id) public payable{
        require(newslist[id].deadline>block.timestamp,"The deadline has passed");
        require(vote[msg.sender][id]==0,"You have already voted");
        require(msg.sender.balance>0.01 ether,"You dont have enough money");
        require(newslist[id].status==0,"News already evaluated");
        require(msg.value==0.01 ether,"Please pay 0.01 ether only");
        require(msg.sender!=newslist[id].newsAgency,"The news publisher cannot vote");
        vote[msg.sender][id]=1;
        newslist[id].Downvote.push(payable(msg.sender));

    }
    function getBalance() public view returns(uint){
      
      return address(this).balance;
  }
    

    function evaluate(uint id) public{
        // uint id=nextNewsEvaluate;
        require(newslist[id].deadline<block.timestamp,"The deadline has not yet passed");
        // require(newslist[id].Upvote.length+newslist[id].Downvote.length>=5,"Not enough votes to make a conclusion");

        if(newslist[id].Upvote.length + newslist[id].Downvote.length<3){
            // nextNewsEvaluate++;
            newslist[id].status=3;
            for(uint i=0;i<newslist[id].Upvote.length;i++){
                (newslist[id].Upvote[i]).transfer(0.01 ether);
            }
         for(uint i=0;i<newslist[id].Downvote.length;i++){
                (newslist[id].Downvote[i]).transfer(0.01 ether);
            }
        (newslist[id].newsAgency).transfer(0.01 ether);
            return;
        }

        else if(newslist[id].Upvote.length>3*(newslist[id].Upvote.length+newslist[id].Downvote.length)/5){
            for(uint i=0;i<newslist[id].Upvote.length;i++){
                (newslist[id].Upvote[i]).transfer((newslist[id].Upvote.length+newslist[id].Downvote.length + 1)*(0.01 ether)/(newslist[id].Upvote.length + 1));
            }
            (newslist[id].newsAgency).transfer((newslist[id].Upvote.length+newslist[id].Downvote.length + 1)*(0.01 ether)/(newslist[id].Upvote.length + 1));
            newslist[id].status=2;


        }
        else if(newslist[id].Downvote.length>3*(newslist[id].Upvote.length+newslist[id].Downvote.length)/5){
            
            for(uint i=0;i<newslist[id].Downvote.length;i++){
                (newslist[id].Downvote[i]).transfer((newslist[id].Upvote.length+newslist[id].Downvote.length + 1)*(0.01 ether)/(newslist[id].Downvote.length));
            }
            newslist[id].status=1;

        }
        // nextNewsEvaluate++;
    }


    function getLatestNewsId() public view returns (uint) {
        return nextId - 1;
    }

    function getAllNews() public view returns (News[] memory) {
        News[] memory allNews = new News[](nextId);

        for (uint i = 0; i < nextId; i++) {
            allNews[i] = newslist[i];
        }

        return allNews;
    }

}